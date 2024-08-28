import { z } from "zod";

// Define the schema for the sign-up form
export const signUpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    
});

// Type for the sign-up form values
export type SignUpFormValues = z.infer<typeof signUpSchema>;