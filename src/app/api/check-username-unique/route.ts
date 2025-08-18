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

    console.log(request.method)
    await dbConnect()


    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        console.log("queryParam", queryParam)

        const result = usernameQuerySchema.safeParse(queryParam)
        console.log("result", result)


        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                succcess: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query"

            }, { status: 400 })
        }


        const { username } = result?.data;
        console.log(result.data)


        const existingVerifiedUsr = await UserModel.findOne({ username, isVerified: true })

        console.log("existingVerifiedUsr", existingVerifiedUsr)

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