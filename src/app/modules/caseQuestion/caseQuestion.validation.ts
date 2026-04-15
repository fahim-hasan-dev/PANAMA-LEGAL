import { z } from "zod";

const createCaseQuestionZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    image: z.string({ required_error: "Image is required" }),
    parent: z.string().optional().nullable(),
  }),
});

export const CaseQuestionValidations = {
  createCaseQuestionZodSchema,
};
