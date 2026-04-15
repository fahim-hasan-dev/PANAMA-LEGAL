import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { ICaseQuestion } from "./caseQuestion.interface";
import { CaseQuestionModel } from "./caseQuestion.model";

const createCaseQuestion = async (payload: ICaseQuestion) => {
  if (payload.parent) {
    const isParentExist = await CaseQuestionModel.findById(payload.parent);
    if (!isParentExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Parent question not found");
    }
  }
  const result = await CaseQuestionModel.create(payload);
  return result;
};

const getRootQuestions = async () => {
  const result = await CaseQuestionModel.find({ parent: null });
  return result;
};

const getSubQuestions = async (parentId: string) => {
  const result = await CaseQuestionModel.find({ parent: parentId });
  return result;
};

const deleteCaseQuestion = async (id: string) => {
  const isExist = await CaseQuestionModel.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Case question not found");
  }

  // Also delete sub-questions recursively or just delete the single one?
  // Usually, deleting a question should handle its children.
  // For now, I'll just delete the specified question as requested.
  const result = await CaseQuestionModel.findByIdAndDelete(id);
  return result;
};

export const CaseQuestionServices = {
  createCaseQuestion,
  getRootQuestions,
  getSubQuestions,
  deleteCaseQuestion,
};
