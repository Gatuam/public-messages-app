import { z } from "zod";

export const signInValidation = z.object({
  email: z.string().email({ message: "Invalid email adresss" }),
  password: z.string().min(6, { message: "Password should be 6 char" }),
});
