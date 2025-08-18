import { z } from 'zod'


export const usernameValidation = z
    .string()
    .min(2, { message: "username atleast two character" })
    .max(20, { message: "username atleast 20 character" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "username must not contain spectialCharacter" })

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .regex(/.+@.+\..+/, { message: "Please use a valid email" }),
    password: z
        .string()
        .min(6, { message: "Password must be atleast 6 character" })
        .max(20, { message: "Password must not exceed 20 character" }
        )
})