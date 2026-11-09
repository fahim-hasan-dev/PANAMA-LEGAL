import QueryBuilder from "../../builder/QueryBuilder";
import { IArticleCategory } from "./articleCategory.interface";
import { ArticleCategory } from "./articleCategory.model";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createArticleCategory = async (payload: IArticleCategory) => {
    const result = await ArticleCategory.create(payload);
    return result;
};

const getAllArticleCategories = async (query: Record<string, unknown>) => {
    const articleCategoryQueryBuilder = new QueryBuilder(ArticleCategory.find({ isActive: true }), query)
        .filter()
        .search(['title'])
        .sort()
        .fields()
        .paginate();

    const categories = await articleCategoryQueryBuilder.modelQuery;
    const meta = await articleCategoryQueryBuilder.getPaginationInfo();

    return {
        meta,
        categories,
    };
};

const getSingleArticleCategory = async (id: string) => {
    const result = await ArticleCategory.findById(id);
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Article category not found");
    }
    return result;
};

const updateArticleCategory = async (id: string, payload: Partial<IArticleCategory>) => {
    const isExist = await ArticleCategory.findById(id);
    if (!isExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Article category not found");
    }

    const result = await ArticleCategory.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteArticleCategory = async (id: string) => {
    const isExist = await ArticleCategory.findById(id);
    if (!isExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Article category not found");
    }
    const result = await ArticleCategory.findByIdAndDelete(id);
    return result;
};

export const ArticleCategoryServices = {
    createArticleCategory,
    getAllArticleCategories,
    getSingleArticleCategory,
    updateArticleCategory,
    deleteArticleCategory,
};
