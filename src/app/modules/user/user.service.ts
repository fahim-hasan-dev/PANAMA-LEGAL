import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { USER_ROLES, USER_STATUS } from '../../../enum/user'
import { JwtPayload } from 'jsonwebtoken'
import { logger } from '../../../shared/logger'
import QueryBuilder from '../../builder/QueryBuilder'
import config from '../../../config'
import mongoose from 'mongoose'
import { emailTemplate } from '../../../shared/emailTemplate'
import { emailHelper } from '../../../helpers/emailHelper'


// get all users (excludes LAWYER and ADMIN by default for User panel)
const getAllUsers = async (query: Record<string, unknown>) => {
    let baseFilter: Record<string, any> = {
        role: { $nin: [USER_ROLES.LAWYER, USER_ROLES.ADMIN] }
    };
    if (query.role) {
        baseFilter = { role: query.role };
    }

    const userQueryBuilder = new QueryBuilder(User.find(baseFilter).select('-password -authentication'), query)
        .search(['email', 'fullName', 'phoneNumber'])
        .filter()
        .sort()
        .fields()
        .paginate()

    const users = await userQueryBuilder.modelQuery
    const meta = await userQueryBuilder.getPaginationInfo()

    return {
        users,
        meta,
    }
}

// get single user
const getSingleUser = async (id: string) => {
    const result = await User.findById(id).select('-password -authentication')
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    return result
}

// delete User
const deleteUser = async (id: string) => {
    const isExistUser = await User.findById(id)
    if (!isExistUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    const result = await User.findByIdAndDelete(id)
    return result
}

// update profile
const updateProfile = async (
    user: JwtPayload,
    payload: Partial<IUser>
) => {
    const isExistUser = await User.findById(user.authId)

    if (!isExistUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found or deleted.')
    }

    // Role-specific field isolation
    const roleFields: Record<string, string[]> = {
        [USER_ROLES.ADMIN]: [],
        [USER_ROLES.CITIZEN]: ['residentialArea', 'dateOfBirth', 'exactAddress'],
        [USER_ROLES.LAWYER]: ['workArea', 'identityNumber', 'suitabilityCertificate'],
        [USER_ROLES.EXPERT]: ['identityDoc', 'specialty'],
        [USER_ROLES.STUDENT]: ['university', 'currentYear', 'studentIdOrEnrollmentProof'],
    };

    const allRoleSpecificFields = Object.values(roleFields).flat();
    const allowedFields = roleFields[isExistUser.role] || [];

    // Filter payload to ensure no unauthorized role fields are updated
    Object.keys(payload).forEach(key => {
        if (allRoleSpecificFields.includes(key) && !allowedFields.includes(key)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Field '${key}' is not allowed for your role (${isExistUser.role})`)
        }
    });

    const updatedUser = await User.findOneAndUpdate(
        { _id: user.authId, status: { $ne: USER_STATUS.DELETED } },
        payload,
        { new: true, runValidators: true },
    ).select('-password -authentication')

    if (!updatedUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update profile')
    }

    return updatedUser
}

// update FCM token
const updateFcmToken = async (userId: string, fcmToken: string) => {
    const isExistUser = await User.findById(userId)
    if (!isExistUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fcmToken },
        { new: true }
    ).select('fcmToken')

    return updatedUser
}

// get profile
const getProfile = async (user: JwtPayload) => {
    const result = await User.findById(user.authId).select('-password -authentication')
    if (!result) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            'The requested profile not found or deleted.',
        )
    }

    return result
}

// delete my account
const deleteMyAccount = async (user: JwtPayload, payload: { password?: string }) => {
    const isExistUser = await User.findById(user.authId).select('+password')
    if (!isExistUser) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            'The requested profile not found or deleted.',
        )
    }

    if (!payload.password) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            'Password is required to delete account'
        )
    }

    const isPasswordMatch = await User.isPasswordMatched(payload.password, isExistUser.password)
    if (!isPasswordMatch) {
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            'Invalid password'
        )
    }

    await User.findByIdAndUpdate(isExistUser._id, {
        $set: { status: USER_STATUS.DELETED },
    })

    return 'Account deleted successfully'
}

// seed admin
const seedAdmin = async () => {
    try {
        const isExistAdmin = await User.findOne({
            email: config.super_admin.email,
            role: USER_ROLES.ADMIN,
        });

        if (!isExistAdmin) {
            await User.create({
                fullName: config.super_admin.name,
                email: config.super_admin.email,
                password: config.super_admin.password,
                role: USER_ROLES.ADMIN,
                verified: true,
                status: USER_STATUS.ACTIVE,
                phoneNumber: '0000000000', // Default phone for seeded admin
                authentication: {
                    oneTimeCode: '',
                    latestRequestAt: new Date(),
                    wrongLoginAttempts: 0,
                    resetPassword: false,
                    restrictionLeftAt: null
                }
            });
            logger.info('✅ Admin seeded successfully');
        } else {
            logger.info('ℹ️ Admin already exists');
        }
    } catch (error) {
        logger.error('❌ Error seeding admin:', error);
    }
};

// get random lawyer
const getRandomLawyer = async (excludedId?: string) => {
    const matchStage: any = {
        role: USER_ROLES.LAWYER,
        status: USER_STATUS.ACTIVE
    };

    if (excludedId) {
        matchStage._id = { $ne: new mongoose.Types.ObjectId(excludedId) };
    }

    let result = await User.aggregate([
        { $match: matchStage },
        { $sample: { size: 1 } },
        {
            $project: {
                password: 0,
                authentication: 0
            }
        }
    ]);

    // Fallback: If no lawyer found
    if (result.length === 0 && excludedId) {
        result = await User.aggregate([
            {
                $match: {
                    role: USER_ROLES.LAWYER,
                    status: USER_STATUS.ACTIVE
                }
            },
            { $sample: { size: 1 } },
            {
                $project: {
                    password: 0,
                    authentication: 0
                }
            }
        ]);
    }

    return result.length > 0 ? result[0] : null;
};

// create user (Admin only)
const createUser = async (payload: IUser) => {
    payload.email = payload.email?.toLowerCase().trim();
    
    if (!payload.role) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User role is required.');
    }
    
    payload.verified = true;
    payload.status = USER_STATUS.ACTIVE;

    const rawPassword = payload.password;

    const isExist = await User.findOne({
        email: payload.email,
        status: { $ne: USER_STATUS.DELETED },
    });

    if (isExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists.');
    }

    const createdUser = await User.create({
        ...payload,
        authentication: {
            oneTimeCode: '',
            latestRequestAt: new Date(),
            wrongLoginAttempts: 0,
            resetPassword: false,
            restrictionLeftAt: null,
        },
    });

    // Send credentials email to user
    try {
        const welcomeEmail = emailTemplate.userAccountCreatedByAdmin({
            name: payload.fullName || 'User',
            email: payload.email,
            password: rawPassword || 'Set by Admin',
            role: payload.role
        });
        setTimeout(() => {
            emailHelper.sendEmail(welcomeEmail);
        }, 0);
    } catch (err) {
        logger.error('Failed to send user credentials email:', err);
    }

    return createdUser;
};

export const UserServices = {
    updateProfile,
    getAllUsers,
    getSingleUser,
    deleteUser,
    getProfile,
    deleteMyAccount,
    seedAdmin,
    getRandomLawyer,
    createUser,
    updateFcmToken,
}

