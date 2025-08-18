import { z } from "zod"

export const signInScheama = z.object({
    identifier: z.string(),
    password: z.string()
})