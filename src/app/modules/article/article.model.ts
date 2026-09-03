import { model, Schema } from "mongoose";
import { IArticle } from "./article.interface";

const articleSchema = new Schema<IArticle>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: false,
            default: "",
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'ArticleCategory',
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ArticleModel = model<IArticle>("Article", articleSchema);
