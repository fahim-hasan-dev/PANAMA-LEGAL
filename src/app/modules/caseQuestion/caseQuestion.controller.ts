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

const getRootQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseQuestionServices.getRootQuestions();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Root questions fetched successfully",
    data: result,
  });
});

const getSubQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseQuestionServices.getSubQuestions(req.params.parentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Sub questions fetched successfully",
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
  getRootQuestions,
  getSubQuestions,
  deleteCaseQuestion,
};
