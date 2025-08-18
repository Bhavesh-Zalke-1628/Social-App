'use client';

import { useState } from 'react';
import {
    Camera,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Settings,
} from 'lucide-react';

export default function ProfilePage() {
    const [dummyUser] = useState({
        name: "Bhavesh Zalke",
        username: "bhavesh.dev",
        email: "bhavesh@example.com",
        phone: "+91 9307831714",
        location: "Pune, India",
        bio: "⚡ Full-stack MERN + Next.js developer | 🚀 Building UIs | 💡 Solving problems",
        joined: "Jan 2024",
        followers: 1200,
        following: 530,
        posts: 48,
        avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=300&h=300&fit=crop&crop=faces",
        cover: "https://images.unsplash.com/photo-1503264116251-35a269479413?w=1200&h=400&fit=crop",
    });

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Cover */}
            <div className="relative w-full h-60">
                <img
                    src={dummyUser.cover}
                    alt="cover"
                    className="w-full h-full object-cover rounded-b-3xl shadow-lg"
                />
                <button className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full shadow hover:bg-gray-700 transition">
                    <Camera className="w-5 h-5 text-gray-200" />
                </button>
            </div>

            {/* Profile Avatar + Info */}
            <div className="relative max-w-4xl mx-auto -mt-20 p-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={dummyUser.avatar}
                            alt="avatar"
                            className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-lg"
                        />
                        <button className="absolute bottom-2 right-2 bg-gray-800 p-1 rounded-full shadow hover:bg-gray-700 transition">
                            <Edit className="w-4 h-4 text-gray-200" />
                        </button>
                    </div>

                    {/* Name + Bio */}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-white">{dummyUser.name}</h1>
                        <p className="text-gray-400">@{dummyUser.username}</p>
                        <p className="mt-2 text-gray-300 max-w-xl">{dummyUser.bio}</p>
                    </div>

                    {/* Action Button */}
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 flex items-center gap-2 transition">
                        <Settings className="w-4 h-4" /> Edit Profile
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-6 justify-center sm:justify-start text-gray-300 font-medium">
                    <button className="hover:text-indigo-400 transition">
                        <strong>{dummyUser.posts}</strong> Posts
                    </button>
                    <button className="hover:text-indigo-400 transition">
                        <strong>{dummyUser.followers}</strong> Followers
                    </button>
                    <button className="hover:text-indigo-400 transition">
                        <strong>{dummyUser.following}</strong> Following
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="max-w-4xl mx-auto bg-gray-800 shadow rounded-xl p-6 mt-6 grid gap-4">
                <div className="flex items-center justify-between gap-3 text-gray-300">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-indigo-400" />
                        {dummyUser.email}
                    </div>
                    <button
                        onClick={() => alert("Logged out!")}
                        className="cursor-pointer mt-4 bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white font-semibold px-4 py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <Settings className="w-5 h-5" />
                        Logout
                    </button>

                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-indigo-400" />
                    {dummyUser.phone}
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                    {dummyUser.location}
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    Joined {dummyUser.joined}
                </div>
            </div>

            {/* Tabs Section */}
            <div className="max-w-4xl mx-auto mt-6">
                <div className="flex justify-around border-b border-gray-700 text-gray-400">
                    <button className="py-3 flex-1 hover:text-indigo-400 font-medium border-b-2 border-indigo-500 text-white transition">
                        Posts
                    </button>
                    <button className="py-3 flex-1 hover:text-indigo-400 font-medium transition">
                        Media
                    </button>
                    <button className="py-3 flex-1 hover:text-indigo-400 font-medium transition">
                        About
                    </button>
                </div>
                <div className="p-6 text-gray-500 text-center">
                    🚧 No posts yet. Start sharing your thoughts!
                </div>
            </div>
        </div>
    );
}
