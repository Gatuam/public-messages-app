import { z } from "zod";

export const verifyCodeValidation = z.object({
  code: z.string().length(5, "verification must be 6 digit"),
});
