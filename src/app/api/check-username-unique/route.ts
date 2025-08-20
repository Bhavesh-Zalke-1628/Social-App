import { config } from "dotenv";
config()
import UserModel from "@/model/UserModel";
import dbConnect from "@/lib/dbConnect";
import { success, z } from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";


export const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {

    await dbConnect()


    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = usernameQuerySchema.safeParse(queryParam)


        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                succcess: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query"

            }, { status: 400 })
        }


        const { username } = result?.data;


        const existingVerifiedUsr = await UserModel.findOne({ username, isVerified: true })


        if (existingVerifiedUsr) {
            return Response.json({ success: false, message: "username  already taked" }, { status: 400 })
        }
        return Response.json(
            {
                success: true,
                message: "username is available"
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
}