import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
    coverImage?: string;
    location?: string;
    website?: string;
    mobile?: number,

    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    posts: mongoose.Types.ObjectId[];

    verifyCode?: string;
    verifyCodeExpiry?: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/.+\@.+\..+/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        name: {
            type: String,
            // required: [true, "Name is required"],
            trim: true,
            default: "Shamrao"
        },
        bio: {
            type: String,
            maxlength: 250,
            default: "",
        },
        avatar: {
            type: String,
        },
        coverImage: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
        mobile: {
            type: Number,
            default: 1234567890
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        verifyCode: {
            type: String,
            default: null,
        },

        verifyCodeExpiry: {
            type: Date,
            default: null,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        isAcceptingMessages: {
            type: Boolean,
            default: true,
        },

    },
    { timestamps: true }
);

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;
