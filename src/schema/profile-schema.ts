import { z } from "zod";

const profileFormSchema = z.object({
  lastName: z.string().min(1, "Surname is required"), // Required
  firstName: z.string().min(1, "Firstname is required"), // Required
  email: z.string().email("Invalid email address"), // Required and validated
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(), // Optional
  accessTier: z.string().min(1, "Access tier is required"), // Required
});

export default profileFormSchema;

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
