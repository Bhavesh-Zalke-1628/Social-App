import { z } from "zod"

export const verifyScheam = z.object({
    code: z.string().min(6, { message: "Verification mus be 6 digit" })
})
