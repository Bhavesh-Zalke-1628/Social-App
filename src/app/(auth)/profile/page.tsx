'use client';

import { useEffect, useState } from 'react';
import {
    Camera,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Settings,
    ArrowLeft,
    MoreHorizontal,
    Share,
    Grid3X3,
    User,
    Heart,
    MessageCircle,
    Plus,
    Upload,
    ExternalLink
} from 'lucide-react';
import CreatePostModal from '@/app/(modal)/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/Redux/Slice/authSlice';

// Mock user? data for demonstration
const mockUser = {
    name: "Sarah Johnson",
    username: "sarah_j",
    email: "sarah.johnson@example.com",
    mobile: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Digital creator passionate about photography, travel, and sustainable living. Always exploring new perspectives and sharing stories through visual art. Currently working on a documentary about urban gardening initiatives.",
    createdAt: "2023-03-15T10:30:00Z",
    posts: Array.from({ length: 12 }, (_, i) => ({ id: i + 1 })),
    followers: Array.from({ length: 2847 }, (_, i) => ({ id: i + 1 })),
    following: Array.from({ length: 892 }, (_, i) => ({ id: i + 1 })),
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=300&h=300&fit=crop&crop=faces",
    cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=400&fit=crop"
};

// Mock posts data
const mockPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=400', likes: 247, comments: 23 },
    { id: 2, image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400', likes: 189, comments: 15 },
    { id: 3, image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400', likes: 312, comments: 41 },
    { id: 4, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', likes: 428, comments: 67 },
    { id: 5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400', likes: 156, comments: 12 },
    { id: 6, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', likes: 283, comments: 34 },
    { id: 7, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', likes: 194, comments: 18 },
    { id: 8, image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400', likes: 367, comments: 52 },
];

interface ContactCardProps {
    icon: React.ReactNode;
    value: string;
    colorClass: string;
}

const ContactCard = ({ icon, value, colorClass }: ContactCardProps) => (
    <div className={`bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-${colorClass}-500/50 transition-all duration-200 hover:scale-105`}>
        <div className="flex items-center gap-3">
            <div className={`p-2.5 bg-${colorClass}-500/20 rounded-lg`}>
                {icon}
            </div>
            <span className="text-gray-300 text-sm font-medium truncate">{value}</span>
        </div>
    </div>
);

interface StatItemProps {
    count: number;
    label: string;
    href?: string;
}

const StatItem = ({ count, label, href }: StatItemProps) => {
    const content = (
        <div className="cursor-pointer hover:text-pink-400 transition-all duration-200 group text-center">
            <div className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                {/* {count.toLocaleString()} */}
            </div>
            <div className="text-sm text-gray-400 group-hover:text-pink-300 transition-colors">
                {/* {label} */}
            </div>
        </div>
    );

    return href ? <a href={href}>{content}</a> : content;
};

interface PostGridProps {
    posts: typeof mockPosts;
    onCreatePost: () => void;
}

const PostGrid = ({ posts, onCreatePost }: PostGridProps) => (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">My Posts</h3>
            <button
                onClick={onCreatePost}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
                <Plus className="w-4 h-4" />
                Create Post
            </button>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {posts.map((post) => (
                    <div key={post.id} className="relative group aspect-square cursor-pointer">
                        <img
                            src={post.image}
                            alt={`Post ${post.id}`}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end justify-center pb-4">
                            <div className="text-white flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4 fill-current text-red-400" />
                                    <span className="text-sm font-semibold">{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MessageCircle className="w-4 h-4 fill-current text-blue-400" />
                                    <span className="text-sm font-semibold">{post.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <Grid3X3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h4 className="text-gray-300 text-xl font-semibold mb-2">No posts yet</h4>
                <p className="text-gray-500 mb-6">Share your first moment with the world</p>
                <button
                    onClick={onCreatePost}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                >
                    Create Your First Post
                </button>
            </div>
        )}
    </div>
);

const AboutSection = ({ user?}: { user?: typeof mockUser }) => (
    <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-white mb-4">About Me</h3>

        <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Bio</h4>
                <p className="text-gray-300 leading-relaxed">{user?.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Member Since</h4>
                    <p className="text-gray-300">
                        {new Date(user?.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Activity</h4>
                    <p className="text-gray-300">
                        {user?.posts.length} posts, {user?.followers.length} followers
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default function ProfilePage() {
    // const [user?] = useState(mockUser);
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    const [showFullBio, setShowFullBio] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const dispatch = useDispatch()
    const { user } = useSelector(state => state?.auth)

    useEffect(() => {
        dispatch(getProfile())
    }, []);
    const handleEditProfile = () => {
        alert("Edit profile functionality would open here");
    };

    const handleSettings = () => {
        alert("Settings page would open here");
    };

    const handleShare = () => {
        navigator.share?.({
            title: `${user?.name}'s Profile`,
            text: `Check out ${user?.name}'s profile`,
            url: window.location.href
        }) || alert("Profile link copied to clipboard!");
    };

    const handleCreatePost = () => {
        setShowPostModal(true)
    };

    const handleCoverChange = () => {
        alert("Cover photo upload would open here");
    };

    const handleAvatarChange = () => {
        alert("Avatar upload would open here");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-gray-100">
            {/* Mobile Header */}
            <header className="sm:hidden sticky top-0 z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
                <div className="flex items-center justify-between p-4">
                    <button
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-semibold text-white truncate">{user?.username}</h1>
                    <button
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                        onClick={handleSettings}
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Cover Section */}
            <div className="relative w-full h-48 sm:h-60 lg:h-80 overflow-hidden">
                <img
                    src={user?.coverImage}
                    alt="Profile cover"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/20"></div>

                {/* Cover Actions */}
                <div className="absolute top-4 right-4 flex space-x-3">
                    <button
                        onClick={handleShare}
                        className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-gray-700/80 transition-all duration-200 hover:scale-110"
                        title="Share profile"
                    >
                        <Share className="w-5 h-5 text-gray-200" />
                    </button>
                    <button
                        onClick={handleCoverChange}
                        className="bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-gray-700/80 transition-all duration-200 hover:scale-110"
                        title="Change cover photo"
                    >
                        <Camera className="w-5 h-5 text-gray-200" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative max-w-4xl mx-auto -mt-16 sm:-mt-20 px-4 lg:px-6">
                {/* Profile Header */}
                <section className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <img
                            src={user?.avatar}
                            alt={`${user?.name}'s avatar`}
                            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-gray-800 shadow-2xl bg-gray-700 transition-transform duration-200 hover:scale-105"
                        />
                        <button
                            onClick={handleAvatarChange}
                            className="absolute bottom-2 right-2 bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            title="Change avatar"
                        >
                            <Edit className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center sm:text-left min-w-0 space-y-3">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                                {user?.name}
                            </h1>
                            <p className="text-gray-400 text-base sm:text-lg">
                                @{user?.username}
                            </p>
                        </div>

                        {/* Bio */}
                        <div className="max-w-2xl">
                            <p className={`text-gray-300 leading-relaxed ${!showFullBio && user?.bio.length > 150 ? 'line-clamp-3' : ''
                                }`}>
                                {user?.bio}
                            </p>
                            {user?.bio.length > 150 && (
                                <button
                                    onClick={() => setShowFullBio(!showFullBio)}
                                    className="text-pink-400 hover:text-pink-300 text-sm mt-2 font-medium transition-colors"
                                >
                                    {showFullBio ? 'Show less' : 'Read more'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleEditProfile}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 font-medium"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </button>
                        <button
                            onClick={handleSettings}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                    </div>
                </section>

                {/* Stats and Message Button */}
                <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                    {/* Stats */}
                    <div className="flex items-center justify-center sm:justify-start gap-8">
                        <StatItem
                            count={user?.posts.length}
                            label="Posts"
                            href={`/profile/${user?.username}/posts`}
                        />
                        <StatItem
                            count={user?.followers.length}
                            label="Followers"
                            href={`/profile/${user?.username}/followers`}
                        />
                        <StatItem
                            count={user?.following.length}
                            label="Following"
                            href={`/profile/${user?.username}/following`}
                        />
                    </div>

                    {/* Message Button */}
                    <a href="/message">
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 font-medium">
                            <MessageCircle className="w-4 h-4" />
                            Message
                        </button>
                    </a>
                </section>

                {/* Contact Info Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <ContactCard
                        icon={<Mail className="w-4 h-4 text-pink-400" />}
                        value={user?.email}
                        colorClass="pink"
                    />
                    <ContactCard
                        icon={<Phone className="w-4 h-4 text-purple-400" />}
                        value={user?.mobile}
                        colorClass="purple"
                    />
                    <ContactCard
                        icon={<MapPin className="w-4 h-4 text-blue-400" />}
                        value={user?.location}
                        colorClass="blue"
                    />
                    <ContactCard
                        icon={<Calendar className="w-4 h-4 text-green-400" />}
                        value={`Joined ${new Date(user?.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short'
                        })}`}
                        colorClass="green"
                    />
                </section>

                {/* Tabs Section */}
                <section className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-2xl mb-8">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all duration-200 font-medium ${activeTab === 'posts'
                                ? 'text-white border-b-2 border-pink-500 bg-gray-700/50'
                                : 'text-gray-400 hover:text-pink-400 hover:bg-gray-700/30'
                                }`}
                        >
                            <Grid3X3 className="w-4 h-4" />
                            Posts
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all duration-200 font-medium ${activeTab === 'about'
                                ? 'text-white border-b-2 border-pink-500 bg-gray-700/50'
                                : 'text-gray-400 hover:text-pink-400 hover:bg-gray-700/30'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            About
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'posts' && (
                            <PostGrid posts={mockPosts} onCreatePost={handleCreatePost} />
                        )}
                        {activeTab === 'about' && (
                            <AboutSection user={user} />
                        )}
                    </div>
                </section>
            </main>

            {/* Bottom Spacing */}
            <div className="h-20 sm:h-8"></div>

            {
                showPostModal &&
                <CreatePostModal
                    isOpen={showPostModal}
                    onClose={() => setShowPostModal(false)}
                    onSubmit={(data) => {
                        // handle form data, upload media, call API, etc.
                        console.log(data);
                    }}
                />
            }


            <style jsx>{`
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}