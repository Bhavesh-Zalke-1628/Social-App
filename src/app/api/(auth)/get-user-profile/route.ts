import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/UserModel";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        const { _id } = session?.user

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const user = await UserModel.findById(_id)

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        return NextResponse.json({ message: "Success", user, success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
