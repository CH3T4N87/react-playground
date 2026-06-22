import z from "zod";

export const ZPasswordSchema = z.object({
  password: z.string().trim().nonempty("Please enter the password").min(8, "Password should be minimum of 8 characters.").max(30, "Password can't be longer than 30 characters."),
  confirmPassword: z.string().trim().nonempty("Please enter the password").min(8, "Password should be minimum of 8 characters.").max(30, "Password can't be longer than 30 characters."),
}) 