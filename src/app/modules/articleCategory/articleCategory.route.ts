import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLES } from "../../../enum/user";
import validateRequest from "../../middleware/validateRequest";
import { ArticleCategoryController } from "./articleCategory.controller";
import { ArticleCategoryValidations } from "./articleCategory.validation";
import { fileAndBodyProcessorUsingDiskStorage } from "../../middleware/processReqBody";

const router = express.Router();

router.post(
    "/",
    auth(USER_ROLES.ADMIN, USER_ROLES.CITIZEN, USER_ROLES.EXPERT, USER_ROLES.LAWYER, USER_ROLES.STUDENT),
    fileAndBodyProcessorUsingDiskStorage(),
    validateRequest(ArticleCategoryValidations.articleCategoryValidation),
    ArticleCategoryController.createArticleCategory
);

router.get("/", ArticleCategoryController.getAllArticleCategories);

router.get("/:id", ArticleCategoryController.getSingleArticleCategory);

router.patch(
    "/:id",
    auth(USER_ROLES.ADMIN, USER_ROLES.CITIZEN, USER_ROLES.EXPERT, USER_ROLES.LAWYER, USER_ROLES.STUDENT),
    fileAndBodyProcessorUsingDiskStorage(),
    validateRequest(ArticleCategoryValidations.updateArticleCategoryValidation),
    ArticleCategoryController.updateArticleCategory
);

router.delete(
    "/:id",
    auth(USER_ROLES.ADMIN, USER_ROLES.CITIZEN, USER_ROLES.EXPERT, USER_ROLES.LAWYER, USER_ROLES.STUDENT),
    ArticleCategoryController.deleteArticleCategory
);

export const ArticleCategoryRoutes = router;
