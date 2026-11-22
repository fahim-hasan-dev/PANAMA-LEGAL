import { z } from "zod";
import { USER_STATUS } from "../../../enum/user";

const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const emailSchema = z.string().email("Invalid email address").toLowerCase().trim();
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export const createAdminValidation = z.object({
    body: z.object({
        fullName: z.string({ required_error: "Full name is required" }),
        email: emailSchema,
        phoneNumber: phoneSchema,
        password: passwordSchema,
        image: z.string().optional(),
        language: z.enum(['en', 'es']).optional(),
    }).strict()
});

export const changeAdminStatusValidation = z.object({
    body: z.object({
        status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.RESTRICTED], {
            required_error: "Status is required (active or restricted)",
        }),
    }).strict()
});

export const AdminValidations = {
    createAdminValidation,
    changeAdminStatusValidation,
};
