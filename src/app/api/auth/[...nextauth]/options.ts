import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                await dbConnect();
                try {
                    if (!credentials) return null;

                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ],
                    });

                    if (!user) {
                        throw new Error("No user found with this email or username");
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account before logging in");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password");
                    }

                    return {
                        _id: user._id?.toString(),
                        username: user.username,
                        email: user.email,
                        isVerified: user.isVerified,
                        isAcceptingMessages: user.isAcceptingMessages,
                    };
                } catch (err) {
                    if (err instanceof Error) throw new Error(err.message);
                    throw new Error("Login failed");
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = (user as any)._id;
                token.username = (user as any).username;
                token.isVerified = (user as any).isVerified;
                token.isAcceptingMessages = (user as any).isAcceptingMessages;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user._id = token._id as string;
                session.user.username = token.username as string;
                session.user.isVerified = token.isVerified as boolean;
                session.user.isAcceptingMessages =
                    token.isAcceptingMessages as boolean;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    secret: "bhavesh",
    pages: {
        signIn: '/sign-in',
    },
};
