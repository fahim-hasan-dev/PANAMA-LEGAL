import { Request, Response, NextFunction } from 'express';
import { USER_ROLES } from '../../enum/user';
import { AiChatUsage } from '../modules/chatbot/aiChatUsage.model';
import catchAsync from '../../shared/catchAsync';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

export const checkAiChatLimit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Only apply to citizens and students
    if (req.user?.role !== USER_ROLES.CITIZEN && req.user?.role !== USER_ROLES.STUDENT) {
        return next();
    }

    const userId = req.user.authId;
    let usage = await AiChatUsage.findOne({ user: userId });

    if (!usage) {
        usage = await AiChatUsage.create({ user: userId });
    }

    const now = new Date();

    // Check if currently locked
    if (usage.lockExpiresAt) {
        if (now < usage.lockExpiresAt) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                'Agotaste tus consultas gratuitas, vuelve a consultar gratis en 72 horas.'
            );
        } else {
            // Lock expired (72 hours passed), reset the count
            usage.questionCount = 0;
            usage.lockExpiresAt = null;
            await usage.save();
            return next();
        }
    }

    // If not locked but count is already 3
    if (usage.questionCount >= 3) {
        usage.lockExpiresAt = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours
        await usage.save();
        throw new ApiError(
            StatusCodes.FORBIDDEN,
            'Agotaste tus consultas gratuitas, vuelve a consultar gratis en 72 horas.'
        );
    }

    next();
});
