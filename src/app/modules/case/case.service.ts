import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { ICase } from './case.interface';
import { Case } from './case.model';

import { User } from '../user/user.model';
import { AiChatUsage } from '../chatbot/aiChatUsage.model';
import { NotificationService } from '../notification/notification.service';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';

const createCaseToDB = async (payload: Partial<ICase>): Promise<ICase> => {
    const isExist = await Case.findOne({
        citizen: payload.citizen,
        lawyer: payload.lawyer,
        status: 'pending'
    });

    if (isExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'A pending case already exists for this lawyer');
    }

    const result = await Case.create(payload);

    // Update AI Chat Usage for the citizen
    if (payload.citizen) {
        await AiChatUsage.findOneAndUpdate(
            { user: payload.citizen },
            { hasContactedLawyer: true, questionCount: 0, lockExpiresAt: null },
            { upsert: true }
        );
    }

    const citizen = await User.findById(payload.citizen).select('fullName email');
    const citizenName = citizen?.fullName || 'A citizen';
    
    await NotificationService.insertNotification({
        title: 'New Case Request',
        message: `You have received a new case request from ${citizenName}`,
        receiver: result.lawyer as any,
        type: 'USER',
        referenceId: result._id,
        screen: 'CASE',
    });

    try {
        const lawyerUser = await User.findById(payload.lawyer).select('fullName email');
        if (lawyerUser?.email) {
            const emailContent = emailTemplate.caseRequestSentEmail({
                lawyerName: lawyerUser.fullName || 'Attorney',
                lawyerEmail: lawyerUser.email,
                citizenName: citizenName
            });
            setTimeout(() => {
                emailHelper.sendEmail(emailContent);
            }, 0);
        }
    } catch (error) {
        console.error("Failed to send case request email", error);
    }

    return result;
};

const getCasesFromDB = async (user: JwtPayload, query: Record<string, unknown>) => {
    if (!query.sort) {
        query.sort = '-createdAt';
    }

    let searchCondition: Record<string, unknown> = {};
    if (query.searchTerm && typeof query.searchTerm === 'string' && query.searchTerm.trim() !== '') {
        const term = query.searchTerm.trim();
        const matchedUsers = await User.find({
            $or: [
                { fullName: { $regex: term, $options: 'i' } },
                { email: { $regex: term, $options: 'i' } }
            ]
        }).select('_id');
        const matchedUserIds = matchedUsers.map(u => u._id);

        searchCondition = {
            $or: [
                { title: { $regex: term, $options: 'i' } },
                { description: { $regex: term, $options: 'i' } },
                { citizen: { $in: matchedUserIds } },
                { lawyer: { $in: matchedUserIds } }
            ]
        };

        delete query.searchTerm;
    }

    const baseFilter = user.role === 'admin'
        ? {}
        : {
            $or: [
                { citizen: user.authId },
                { lawyer: user.authId }
            ]
        };

    const filterConditions = Object.keys(searchCondition).length > 0
        ? { $and: [baseFilter, searchCondition] }
        : baseFilter;

    const caseQuery = new QueryBuilder(
        Case.find(filterConditions),
        query
    )
        .filter()
        .sort()
        .paginate();

    const result = await caseQuery.modelQuery
        .populate('citizen', 'fullName profilePicture email')
        .populate('lawyer', 'fullName profilePicture email')
        .populate('lastMessage')
        .lean();

    const pagination = await caseQuery.getPaginationInfo();

    return {
        data: result,
        pagination
    };
};

const getCaseByIdFromDB = async (id: string, user: JwtPayload): Promise<ICase | null> => {
    const result = await Case.findById(id)
        .populate('citizen', 'fullName profilePicture email')
        .populate('lawyer', 'fullName profilePicture email')
        .populate('lastMessage');

    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Case not found');
    }

    if (
        user.role !== 'admin' &&
        result.citizen?._id?.toString() !== user.authId &&
        result.lawyer?._id?.toString() !== user.authId
    ) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'You are not authorized to view this case');
    }

    return result;
};

const updateCaseStatusToDB = async (id: string, user: JwtPayload, status: string): Promise<ICase | null> => {
    const isExist = await Case.findById(id);
    if (!isExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Case not found');
    }

    // Role-based status update logic
    if (user.role === 'lawyer') {
        if (isExist.lawyer.toString() !== user.authId) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'You are not authorized to update this case');
        }
        // Lawyer can accept or cancel
        if (!['accepted', 'cancelled', 'closed'].includes(status)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid status update for lawyer');
        }
    } else if (user.role === 'citizen') {
        if (isExist.citizen.toString() !== user.authId) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'You are not authorized to update this case');
        }
        // Citizen can cancel or close
        if (!['cancelled', 'closed'].includes(status)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid status update for citizen');
        }
    } else if (user.role !== 'admin') {
        throw new ApiError(StatusCodes.FORBIDDEN, 'You are not authorized to update this case');
    }

    const result = await Case.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );

    if (result) {
        const citizenUser = await User.findById(result.citizen).select('fullName email');
        const lawyerUser = await User.findById(result.lawyer).select('fullName email');

        let title = '';
        let message = '';
        let receiverId = null;

        if (status === 'accepted') {
            title = 'Case Request Accepted';
            message = `Your case request has been accepted by ${lawyerUser?.fullName || 'the lawyer'}.`;
            receiverId = result.citizen;

            try {
                if (citizenUser?.email) {
                    const emailContent = emailTemplate.caseRequestAcceptedEmail({
                        citizenName: citizenUser.fullName || 'User',
                        citizenEmail: citizenUser.email,
                        lawyerName: lawyerUser?.fullName || 'Attorney'
                    });
                    setTimeout(() => {
                        emailHelper.sendEmail(emailContent);
                    }, 0);
                }
            } catch (err) { console.error("Failed to send accept email", err); }

        } else if (status === 'cancelled') {
            if (user.role === 'lawyer') {
                title = 'Case Request Declined';
                message = `Your case request was declined by ${lawyerUser?.fullName || 'the lawyer'}.`;
                receiverId = result.citizen;

                try {
                    if (citizenUser?.email) {
                        const emailContent = emailTemplate.caseRequestRejectedEmail({
                            citizenName: citizenUser.fullName || 'User',
                            citizenEmail: citizenUser.email,
                            lawyerName: lawyerUser?.fullName || 'Attorney'
                        });
                        setTimeout(() => {
                            emailHelper.sendEmail(emailContent);
                        }, 0);
                    }
                } catch (err) { console.error("Failed to send reject email", err); }
            } else if (user.role === 'citizen') {
                title = 'Case Request Cancelled';
                message = `The case request was cancelled by ${citizenUser?.fullName || 'the citizen'}.`;
                receiverId = result.lawyer;
            }
        } else if (status === 'closed') {
            title = 'Case Closed';
            if (user.role === 'lawyer') {
                message = `Your case with ${lawyerUser?.fullName || 'the lawyer'} has been closed.`;
                receiverId = result.citizen;
            } else {
                message = `The case with ${citizenUser?.fullName || 'the citizen'} has been closed.`;
                receiverId = result.lawyer;
            }
        }

        if (receiverId && title && message) {
            await NotificationService.insertNotification({
                title,
                message,
                receiver: receiverId as any,
                type: 'USER',
                referenceId: result._id,
                screen: 'CASE',
            });
        }
    }

    return result;
};

export const CaseService = {
    createCaseToDB,
    getCasesFromDB,
    getCaseByIdFromDB,
    updateCaseStatusToDB
};
