import { z } from "zod";

const profileFormSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  firstname: z.string().min(1, "Firstname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  employeeNumber: z.string().min(1, "Employee number is required"),
  accessTier: z.string().min(1, "Access tier is required"),
});

export default profileFormSchema;


export type ProfileFormValues = z.infer<typeof profileFormSchema>;
