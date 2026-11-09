import { z } from "zod";

export const articleCategoryValidation = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }),
        isActive: z.boolean().optional(),
    }).strict()
});

export const updateArticleCategoryValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        isActive: z.boolean().optional(),
    }).strict()
});

export const ArticleCategoryValidations = {
    articleCategoryValidation,
    updateArticleCategoryValidation,
};
