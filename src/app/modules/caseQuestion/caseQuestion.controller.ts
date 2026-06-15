import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CaseQuestionServices } from "./caseQuestion.service";

const createCaseQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseQuestionServices.createCaseQuestion(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Case question created successfully",
    data: result,
  });
});

const getCaseQuestions = catchAsync(async (req: Request, res: Response) => {
  const parentId = req.query.parentId as string | undefined;
  const result = await CaseQuestionServices.getCaseQuestions(parentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: parentId
      ? "Sub questions fetched successfully"
      : "Root questions fetched successfully",
    data: result,
  });
});

const deleteCaseQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseQuestionServices.deleteCaseQuestion(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Case question deleted successfully",
    data: result,
  });
});

export const CaseQuestionControllers = {
  createCaseQuestion,
  getCaseQuestions,
  deleteCaseQuestion,
};
