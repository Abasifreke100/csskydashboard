import { z } from "zod";

export const newTaskFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
  priority: z.string().optional(),
  // file: z.any().optional(),
  assignee: z.string().optional(),
  ticketID: z.string().optional(), 
});
