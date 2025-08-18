import { config } from "dotenv";
config();

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/Helper/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        console.log("Incoming data:", username, email, password);

        // Validate fields
        if (!username || !email || !password) {
            return Response.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        // Check if username already exists (and verified)
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingVerifiedUser) {
            return Response.json(
                { success: false, message: "Username already taken" },
                { status: 400 }
            );
        }

        // Check if email exists
        const existingUserByEmail = await UserModel.findOne({ email });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    { success: false, message: "Email already registered and verified" },
                    { status: 400 }
                );
            } else {
                // Update unverified user
                existingUserByEmail.password = await bcrypt.hash(password, 10);
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
                await existingUserByEmail.save();
            }
        } else {
            // Create a new user
            const newUser = await UserModel.create({
                username,
                email,
                password: await bcrypt.hash(password, 10),
                verifyCode,
                isVerified: false,
                verifyCodeExpiry: new Date(Date.now() + 3600000),
            });

            const savedUser = await newUser.save();
            console.log("✅ Created User:", savedUser.toObject());
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: true,
                    message:
                        "User registered successfully, but verification email could not be sent. Please try again later.",
                },
                { status: 201 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please verify your email.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error registering user:", error);
        return Response.json(
            { success: false, message: "Error registering user" },
            { status: 500 }
        );
    }
}
