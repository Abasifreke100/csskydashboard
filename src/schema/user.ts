import { z } from "zod";

export const ActivateUserFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  paymentLink: z.string().url({
    message: "Payment link must be a valid URL.",
  }),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
});

