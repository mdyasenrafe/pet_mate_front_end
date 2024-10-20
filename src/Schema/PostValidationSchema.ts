import { z } from "zod";

export const createPostValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["tip", "story"], {
    errorMap: () => ({ message: "Invalid category selected" }),
  }),
  files: z.array(z.string()).optional(),
  monetization: z.boolean().optional(),
});
