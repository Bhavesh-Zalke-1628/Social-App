import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
    author: mongoose.Types.ObjectId;
    content: string;
    media: string[]; // images/videos
    likes: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema<Post> = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            trim: true,
            maxlength: 500, // Limit post length (like Twitter/X style)
        },
        media: [
            {
                type: String, // URLs for images/videos
            },
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", // Users who liked the post
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment", // Ref to Comment model
            },
        ],
        tags: [
            {
                type: String, // hashtags or mentions
                trim: true,
            },
        ],
    },
    { timestamps: true }
);

const PostModel =
    (mongoose.models.Post as mongoose.Model<Post>) ||
    mongoose.model<Post>("Post", PostSchema);

export default PostModel;
