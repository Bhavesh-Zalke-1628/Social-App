import UserModel from "@/model/UserModel";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Use `session.user.id` instead of _id (unless you extended it)
        const users = await UserModel.find(
            {
                _id: {
                    $ne: session.user._id
                }
            }
        ).select("-password");


        return NextResponse.json({ message: "Success", users, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
