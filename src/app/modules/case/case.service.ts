import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { ICase } from './case.interface';
import { Case } from './case.model';

import { User } from '../user/user.model';

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

    return result;
};

export const CaseService = {
    createCaseToDB,
    getCasesFromDB,
    getCaseByIdFromDB,
    updateCaseStatusToDB
};
