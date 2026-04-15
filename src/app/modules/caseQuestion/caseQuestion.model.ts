import { model, Schema } from "mongoose";
import { ICaseQuestion } from "./caseQuestion.interface";

const caseQuestionSchema = new Schema<ICaseQuestion>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "CaseQuestion",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const CaseQuestionModel = model<ICaseQuestion>(
  "CaseQuestion",
  caseQuestionSchema
);
