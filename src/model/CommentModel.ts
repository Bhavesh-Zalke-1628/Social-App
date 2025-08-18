import mongoose, { Schema, Document } from "mongoose";

export interface Comment extends Document {
    post: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    content: string;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema<Comment> = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: [true, "Comment cannot be empty"],
            trim: true,
            maxlength: 300,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", // users who liked the comment
            },
        ],

    },
    { timestamps: true }
);

const CommentModel =
    (mongoose.models.Comment as mongoose.Model<Comment>) ||
    mongoose.model<Comment>("Comment", CommentSchema);

export default CommentModel;
