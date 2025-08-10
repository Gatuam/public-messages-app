import { z } from "zod";

export const verifyCodeValidation = z.object({
  code: z.string().length(6, "verification must be 6 digit"),
});
