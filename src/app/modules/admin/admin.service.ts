import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';
import { USER_ROLES, USER_STATUS } from '../../../enum/user';
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../../config';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import { logger } from '../../../shared/logger';

const getAllAdmins = async (query: Record<string, unknown>) => {
    const baseFilter: Record<string, any> = {
        role: USER_ROLES.ADMIN,
        status: { $ne: USER_STATUS.DELETED },
    };

    const adminQueryBuilder = new QueryBuilder(
        User.find(baseFilter).select('-password -authentication'),
        query
    )
        .search(['email', 'fullName', 'phoneNumber'])
        .filter()
        .sort()
        .fields()
        .paginate();

    const admins = await adminQueryBuilder.modelQuery;
    const meta = await adminQueryBuilder.getPaginationInfo();

    return {
        meta,
        admins,
    };
};

const getSingleAdmin = async (id: string) => {
    const result = await User.findOne({
        _id: id,
        role: USER_ROLES.ADMIN,
        status: { $ne: USER_STATUS.DELETED },
    }).select('-password -authentication');

    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin account not found');
    }
    return result;
};

const createAdmin = async (payload: Partial<IUser>) => {
    payload.email = payload.email?.toLowerCase().trim();

    const rawPassword = payload.password;

    const isExist = await User.findOne({
        email: payload.email,
        status: { $ne: USER_STATUS.DELETED },
    });

    if (isExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists.');
    }

    if (payload.phoneNumber) {
        const isPhoneExist = await User.isPhoneExists(payload.phoneNumber);
        if (isPhoneExist) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Phone number already exists.');
        }
    }

    const createdAdmin = await User.create({
        ...payload,
        role: USER_ROLES.ADMIN,
        verified: true,
        status: USER_STATUS.ACTIVE,
        authentication: {
            oneTimeCode: '',
            latestRequestAt: new Date(),
            wrongLoginAttempts: 0,
            resetPassword: false,
            restrictionLeftAt: null,
        },
    });

    // Send credentials email to new admin
    try {
        const userLang = payload.language === 'en' || createdAdmin.language === 'en' ? 'en' : 'es';
        const welcomeEmail = emailTemplate.userAccountCreatedByAdmin({
            name: payload.fullName || 'Admin',
            email: payload.email!,
            password: rawPassword || 'Set by Admin',
            role: USER_ROLES.ADMIN,
            lang: userLang,
        });
        setTimeout(() => {
            emailHelper.sendEmail(welcomeEmail);
        }, 0);
    } catch (err) {
        logger.error('Failed to send admin credentials email:', err);
    }

    return await User.findById(createdAdmin._id).select('-password -authentication');
};

const changeAdminStatus = async (
    currentAdminId: string,
    targetAdminId: string,
    status: USER_STATUS
) => {
    if (currentAdminId === targetAdminId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot block your own account');
    }

    const targetUser = await User.findById(targetAdminId);
    if (!targetUser || targetUser.status === USER_STATUS.DELETED || targetUser.role !== USER_ROLES.ADMIN) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin account not found');
    }

    if (targetUser.email === config.super_admin.email) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Super admin account cannot be modified or deleted');
    }

    targetUser.status = status;
    await targetUser.save();

    return await User.findById(targetAdminId).select('-password -authentication');
};

const deleteAdmin = async (currentAdminId: string, targetAdminId: string) => {
    if (currentAdminId === targetAdminId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot delete your own account');
    }

    const targetUser = await User.findById(targetAdminId);
    if (!targetUser || targetUser.status === USER_STATUS.DELETED || targetUser.role !== USER_ROLES.ADMIN) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Admin account not found');
    }

    if (targetUser.email === config.super_admin.email) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Super admin account cannot be modified or deleted');
    }

    await User.findByIdAndUpdate(targetAdminId, {
        $set: { status: USER_STATUS.DELETED },
    });

    return null;
};

export const AdminServices = {
    getAllAdmins,
    getSingleAdmin,
    createAdmin,
    changeAdminStatus,
    deleteAdmin,
};
