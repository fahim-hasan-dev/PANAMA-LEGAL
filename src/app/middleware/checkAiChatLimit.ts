import { Request, Response, NextFunction } from 'express';
import { USER_ROLES } from '../../enum/user';
import { AiChatUsage } from '../modules/chatbot/aiChatUsage.model';
import catchAsync from '../../shared/catchAsync';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

export const checkAiChatLimit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Only apply to citizens
    if (req.user?.role !== USER_ROLES.CITIZEN) {
        return next();
    }

    const userId = req.user.authId;
    let usage = await AiChatUsage.findOne({ user: userId });

    if (!usage) {
        usage = await AiChatUsage.create({ user: userId });
    }

    // If they already contacted a lawyer, no restriction
    if (usage.hasContactedLawyer) {
        return next();
    }

    const now = new Date();

    // Check if currently locked
    if (usage.lockExpiresAt) {
        if (now < usage.lockExpiresAt) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'Chat is locked. Please consult a lawyer to continue.');
        } else {
            // Lock expired (48 hours passed), reset the count
            usage.questionCount = 0;
            usage.lockExpiresAt = null;
            await usage.save();
            return next();
        }
    }

    // If not locked but count is already 3 (shouldn't normally happen without a lock, but just in case)
    if (usage.questionCount >= 3) {
        usage.lockExpiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours
        await usage.save();
        throw new ApiError(StatusCodes.FORBIDDEN, 'Chat is locked. Please consult a lawyer to continue.');
    }

    next();
});
