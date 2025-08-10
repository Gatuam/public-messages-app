import { z } from "zod";

export const usernameValidation = z.object({
  username: z
    .string()
    .min(3, "Username should be at leat 3 char")
    .max(20, "Username mustr not be longer than 20 char"),
});

export const signUpValidation = z.object({
  username: z
    .string()
    .min(3, "Username should be at leat 3 char")
    .max(20, "Username mustr not be longer than 20 char"),
  email: z
  .string()
  .email({ message: "Invalid email adresss" }),
  password: z
  .string()
  .min(6, { message: "Password should be 6 char" }),
});
