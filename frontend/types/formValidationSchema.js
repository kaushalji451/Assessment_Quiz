import { z } from "zod";

const DepartmentEnum = z.enum([ "technical", "business"],{
    message:"Department can be Technical or Business"
});

export const formValidationSchema = z.object({
    name: z.string({
        required_error: "Please enter your name"
    }).min(1, { message: "Name cannot be empty" }),

    email: z.string({
        required_error: "Email is required"
    }).email({ message: "Please enter a valid email" }),

    phoneno: z
        .string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string"
        })
        .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit phone number" }),

    dob: z.string({
        required_error: "Date of Birth is required"
    }),

    gender: z.string({
        required_error: "Gender is required"
    }).min(1, { message: "Gender is required" }),


    degree: z.string({
        required_error: "Degree is required"
      }).min(1, { message: "Degree is required" }),      
    department: DepartmentEnum,

    sop: z.string({
        required_error: "Statement of Purpose is required"
    }).min(200,{
        message:"SOP can be minimum of 200 words"
    }).max(500,{message:"SOP can be maximum of 500 words"}),
    file: z
        .any()
        .refine((file) => file instanceof File, {
            message: "File is required",
        })
        .refine((file) => file?.size <= 2 * 1024 * 1024, {
            message: "File size must be less than 2MB",
        })
        .refine((file) => file?.type === "application/pdf", {
            message: "Only PDF files are allowed",
        }),

});
