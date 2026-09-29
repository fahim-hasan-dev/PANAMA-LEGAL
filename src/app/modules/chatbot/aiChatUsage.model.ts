import { Schema, model } from 'mongoose';

export interface IAiChatUsage {
    user: Schema.Types.ObjectId;
    questionCount: number;
    lockExpiresAt: Date | null;
    hasContactedLawyer: boolean;
}

const aiChatUsageSchema = new Schema<IAiChatUsage>({
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    questionCount: { type: Number, default: 0 },
    lockExpiresAt: { type: Date, default: null },
    hasContactedLawyer: { type: Boolean, default: false }
}, { timestamps: true });

export const AiChatUsage = model<IAiChatUsage>('AiChatUsage', aiChatUsageSchema);
