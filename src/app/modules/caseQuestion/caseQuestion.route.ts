import express from "express";
import { USER_ROLES } from "../../../enum/user";
import auth from "../../middleware/auth";
import { fileAndBodyProcessorUsingDiskStorage } from "../../middleware/processReqBody";
import validateRequest from "../../middleware/validateRequest";
import { CaseQuestionControllers } from "./caseQuestion.controller";
import { CaseQuestionValidations } from "./caseQuestion.validation";

const router = express.Router();

router.post(
  "/add-question",
  auth(USER_ROLES.ADMIN),
  fileAndBodyProcessorUsingDiskStorage(),
  validateRequest(CaseQuestionValidations.createCaseQuestionZodSchema),
  CaseQuestionControllers.createCaseQuestion
);

router.get("/", CaseQuestionControllers.getCaseQuestions);

router.delete(
  "/delete-question/:id",
  auth(USER_ROLES.ADMIN),
  CaseQuestionControllers.deleteCaseQuestion
);

export const CaseQuestionRoutes = router;
