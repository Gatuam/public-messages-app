import { z } from "zod";

export const messageValidationSchema = z.object({
  message: z.string()
  .min(10, 'content must contain 10 char')
  .max(300, "content must be less than 300 char"),
});
