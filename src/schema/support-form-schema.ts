import { z } from "zod";

// Define the schema for support form values
const supportFormSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  firstname: z.string().min(1, "Firstname is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

// Define TypeScript type for form values
export type SupportFormValues = z.infer<typeof supportFormSchema>;

export default supportFormSchema;
