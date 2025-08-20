import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../../auth/[...nextauth]/options";
import PostModel from "@/model/PostModel";

// Validation schema
const createPostSchema = z.object({
    content: z.string()
        .min(1, "Content is required")
        .max(500, "Content cannot exceed 500 characters")
        .trim(),
    media: z.array(z.string().url("Invalid media URL")).optional().default([]),
    tags: z.array(z.string().trim()).optional().default([]),
});

export async function POST(request: Request) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json(
                { error: "You must be logged in to create a post." },
                { status: 401 }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const validatedData = createPostSchema.parse(body);

        // Connect to database
        await dbConnect();

        // Create post with author from session
        const post = new PostModel({
            author: new mongoose.Types.ObjectId(session.user.id),
            content: validatedData.content,
            media: validatedData.media,
            tags: validatedData.tags,
            likes: [], // Initialize empty arrays
            comments: [],
        });

        // Save post to database
        const savedPost = await post.save();

        // Populate author information for response
        await savedPost.populate('author', 'username email profilePicture');

        return NextResponse.json(
            {
                success: true,
                message: "Post created successfully",
                post: savedPost,
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error creating post:", error);

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.message
                },
                { status: 400 }
            );
        }

        // Handle MongoDB validation errors
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                {
                    error: "Database validation failed",
                    details: Object.values(error.errors).map(err => err.message)
                },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}