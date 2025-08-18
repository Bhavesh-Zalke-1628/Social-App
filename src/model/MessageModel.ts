import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    content: string;
    media?: string; // for image, video, audio, etc.
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema: Schema<Message> = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        media: {
            type: String, // file URL (image, video, audio, etc.)
            default: null,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const MessageModel =
    (mongoose.models.Message as mongoose.Model<Message>) ||
    mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
