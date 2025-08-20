"use client"
import { useState, useEffect } from 'react';
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    MoreHorizontal,
    Search,
    Bell,
    Settings,
    Home,
    Compass,
    Send,
    Camera,
    Video,
    MapPin,
    Users,
    TrendingUp,
    Sparkles,
    Loader2,
    Menu,
    X,
    Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@react-email/components';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getProfile } from '@/Redux/Slice/authSlice';

// Type definitions
interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
    isOnline?: boolean;
    mutualFriends?: number;
    isFollowing?: boolean;
    posts?: any[];
    followers?: any[];
    following?: any[];
}

interface Post {
    id: string;
    user: User;
    content: string;
    image?: string;
    video?: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isSaved: boolean;
    timestamp: string;
    location?: string;
}

interface Story {
    id: string;
    user: User;
    image: string;
    isViewed: boolean;
}

interface SuggestedUser {
    id: string;
    name: string;
    username: string;
    avatar: string;
    mutualFriends: number;
    isFollowing: boolean;
}

interface TrendingTopic {
    id: string;
    title: string;
    posts: number;
    category: string;
}

interface RootState {
    auth: {
        user: User | null;
        users: User[];
        loading: boolean;
        error: any;
    };
}

export default function Dashboard() {

    const { data } = useSession();
    const dispatch = useDispatch()

    const [posts, setPosts] = useState<Post[]>([]);
    const [stories, setStories] = useState<Story[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
    const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
    const [newPost, setNewPost] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'feed' | 'explore' | 'notifications'>('feed');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

    // Current user data
    const currentUser: User = {
        id: '1',
        name: 'Bhavesh Zalke',
        username: 'bhavesh_dev',
        avatar: 'https://i.pravatar.cc/40?img=1',
        isVerified: true,
    };
    const { user, users, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(getProfile());
        }
        dispatch(getAllUsers())
    }, [dispatch]);

    // Mock data initialization
    useEffect(() => {
        setPosts([
            {
                id: '1',
                user: { id: '2', name: 'Sarah Chen', username: 'sarah_designs', avatar: 'https://i.pravatar.cc/40?img=1', isVerified: true },
                content: "Just finished working on a new UI design for a travel app! 🌅",
                image: 'https://images.unsplash.com/photo-1755095901050-1a4754f1f064?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D',
                likes: 234,
                comments: 18,
                shares: 5,
                isLiked: false,
                isSaved: false,
                timestamp: '2h',
                location: 'San Francisco, CA',
            },
            {
                id: '2',
                user: { id: '3', name: 'Alex Rodriguez', username: 'alex_codes', avatar: 'https://i.pravatar.cc/40?img=2', isVerified: false },
                content: "Excited to share my first full-stack app 🚀 Built with Next.js, TypeScript, and Prisma.",
                image: 'https://images.unsplash.com/photo-1754887966362-952236591654?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
                likes: 89,
                comments: 12,
                shares: 3,
                isLiked: true,
                isSaved: true,
                timestamp: '4h',
            },
            {
                id: '3',
                user: { id: '4', name: 'Emma Wilson', username: 'emma_travels', avatar: 'https://i.pravatar.cc/40?img=3', isVerified: true },
                content: "Morning coffee in Kyoto with cherry blossoms 🌸",
                image: 'https://images.unsplash.com/photo-1755148500082-8f39dea5dc0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
                likes: 456,
                comments: 32,
                shares: 12,
                isLiked: true,
                isSaved: false,
                timestamp: '6h',
                location: 'Kyoto, Japan',
            },
        ]);

        setStories([
            { id: '1', user: currentUser, image: 'https://i.pravatar.cc/40?img=1', isViewed: false },
            { id: '2', user: { id: '2', name: 'Sarah', username: 'sarah_designs', avatar: 'https://i.pravatar.cc/40?img=1' }, image: '/api/placeholder/60/60', isViewed: false },
            { id: '3', user: { id: '3', name: 'Alex', username: 'alex_codes', avatar: 'https://i.pravatar.cc/40?img=2' }, image: '/api/placeholder/60/60', isViewed: true },
            { id: '4', user: { id: '4', name: 'Emma', username: 'emma_travels', avatar: 'https://i.pravatar.cc/40?img=3' }, image: '/api/placeholder/60/60', isViewed: false },
            { id: '5', user: { id: '5', name: 'Mike', username: 'mike_fitness', avatar: 'https://i.pravatar.cc/40?img=4' }, image: '/api/placeholder/60/60', isViewed: false },
            { id: '6', user: { id: '6', name: 'Lisa', username: 'lisa_art', avatar: 'https://i.pravatar.cc/40?img=5' }, image: '/api/placeholder/60/60', isViewed: false },
        ]);

        setSuggestedUsers([
            { id: '6', name: 'Jessica Adams', username: 'jess_photo', avatar: 'https://i.pravatar.cc/40?img=6', mutualFriends: 5, isFollowing: false },
            { id: '7', name: 'David Kim', username: 'david_music', avatar: 'https://i.pravatar.cc/40?img=7', mutualFriends: 3, isFollowing: false },
        ]);

        setTrendingTopics([
            { id: '1', title: '#WebDevelopment', posts: 2847, category: 'Technology' },
            { id: '2', title: '#DigitalNomad', posts: 1923, category: 'Lifestyle' },
            { id: '3', title: '#UIUX', posts: 1456, category: 'Design' },
        ]);
    }, []);

    const handleLike = (postId: string): void => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );
    };

    const handleSave = (postId: string): void => {
        setPosts(prevPosts => prevPosts.map(post => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)));
    };

    const handleFollow = (userId: string): void => {
        setSuggestedUsers(prevUsers => prevUsers.map(user => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)));
    };

    const handlePostSubmit = (): void => {
        if (!newPost.trim()) return;
        const post: Post = {
            id: Date.now().toString(),
            user: currentUser,
            content: newPost,
            likes: 0,
            comments: 0,
            shares: 0,
            isLiked: false,
            isSaved: false,
            timestamp: 'now',
        };
        setPosts(prevPosts => [post, ...prevPosts]);
        setNewPost('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-gray-300">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm bg-gray-800/80 border-gray-700">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Mobile Menu Button */}
                        <div className="flex items-center space-x-3">
                            <button
                                className="md:hidden p-2 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-full"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>

                            {/* Logo */}
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                    SocialSphere
                                </span>
                            </div>
                        </div>

                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search users, posts, or topics..."
                                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-pink-400 border border-transparent"
                                />
                            </div>
                        </div>

                        {/* Header Icons */}
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            {/* Mobile Search Button */}
                            <button
                                className="md:hidden p-2 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-full"
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Desktop Navigation Icons */}
                            <div className="hidden sm:flex items-center space-x-2">
                                <Button className="p-2 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-full">
                                    <Home className="w-5 h-5" />
                                </Button>
                                <Button className="p-2 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-full">
                                    <Compass className="w-5 h-5" />
                                </Button>
                                <Button className="p-2 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-full relative">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </Button>
                                <Link href='/message'>
                                    <Button className="p-2 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-full">
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Avatar */}
                            <Link href='/profile'>
                                <button className="flex items-center space-x-2 p-1 sm:p-2 rounded-full hover:bg-gray-700 cursor-pointer">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                                        <img src={currentUser?.avatar} alt="" className='w-full h-full rounded-full object-cover' />
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {showMobileSearch && (
                        <div className="md:hidden pb-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-pink-400 border border-transparent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Navigation Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform">
                        <div className="p-4 border-b border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src={currentUser?.avatar} alt="" className='w-full h-full rounded-full object-cover' />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{user?.name || currentUser.name}</h3>
                                    <p className="text-sm text-gray-400">@{user?.username || currentUser.username}</p>
                                </div>
                            </div>
                        </div>

                        <nav className="p-4 space-y-2">
                            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                <Home className="w-5 h-5 text-pink-400" />
                                <span className="text-gray-300">Home</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                <Compass className="w-5 h-5 text-purple-400" />
                                <span className="text-gray-300">Explore</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                <Bell className="w-5 h-5 text-blue-400" />
                                <span className="text-gray-300">Notifications</span>
                            </button>
                            <Link href='/message'>
                                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                    <Send className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Messages</span>
                                </button>
                            </Link>
                            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                <Settings className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-300">Settings</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Sidebar - Hidden on mobile, visible on large screens */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20 space-y-6">
                            {/* User Card */}
                            <div className="rounded-2xl p-6 shadow-sm border bg-gray-800 border-gray-700">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                                        <img src={currentUser?.avatar} alt="" className='rounded-full w-full h-full object-cover' />
                                    </div>
                                    <h3 className="font-bold text-white mb-1">{user?.name || currentUser.name}</h3>
                                    <p className="text-sm text-gray-400 mb-4">@{user?.username || currentUser.username}</p>

                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="font-bold text-white">{user?.posts?.length || 0}</p>
                                            <p className="text-xs text-gray-400">Posts</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{user?.followers?.length || 0}</p>
                                            <p className="text-xs text-gray-400">Followers</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{user?.following?.length || 0}</p>
                                            <p className="text-xs text-gray-400">Following</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trending Topics */}
                            <div className="rounded-2xl p-6 shadow-sm border bg-gray-800 border-gray-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-pink-500" />
                                    <h3 className="font-bold text-white">Trending</h3>
                                </div>
                                <div className="space-y-3">
                                    {trendingTopics.map((topic) => (
                                        <div key={topic.id} className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                                            <h4 className="font-semibold text-pink-500 text-sm">{topic.title}</h4>
                                            <p className="text-xs text-gray-400">{topic.posts.toLocaleString()} posts</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Feed - Takes full width on mobile/tablet */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        {/* Stories */}
                        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border bg-gray-800 border-gray-700">
                            <h3 className="font-bold mb-3 sm:mb-4 text-white">Stories</h3>
                            <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                                {stories.map((story) => (
                                    <div key={story.id} className="flex-shrink-0 text-center">
                                        <div
                                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 cursor-pointer ${story.isViewed ? 'bg-gray-600' : 'bg-gradient-to-tr from-pink-500 to-purple-500'
                                                }`}
                                        >
                                            <div className="w-full h-full rounded-full p-1 bg-gray-800">
                                                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center overflow-hidden">
                                                    <img src={story?.user?.avatar} alt="" className='w-full h-full object-cover rounded-full' />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2 truncate w-14 sm:w-16">
                                            {story.id === '1' ? 'Your story' : story.user.name.split(' ')[0]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Create Post */}
                        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border bg-gray-800 border-gray-700">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src={currentUser?.avatar} alt="" className='rounded-full object-cover w-full h-full' />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                        placeholder="What's on your mind?"
                                        className="w-full p-3 sm:p-4 border rounded-xl bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 resize-none text-sm sm:text-base"
                                        rows={3}
                                    />
                                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                                        <div className="flex items-center space-x-2 sm:space-x-4 text-gray-400">
                                            <button className="flex items-center space-x-1 sm:space-x-2 hover:text-pink-400 text-xs sm:text-sm">
                                                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="hidden sm:inline">Photo</span>
                                            </button>
                                            <button className="flex items-center space-x-1 sm:space-x-2 hover:text-pink-400 text-xs sm:text-sm">
                                                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="hidden sm:inline">Video</span>
                                            </button>
                                            <button className="flex items-center space-x-1 sm:space-x-2 hover:text-pink-400 text-xs sm:text-sm">
                                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="hidden sm:inline">Location</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={handlePostSubmit}
                                            disabled={!newPost.trim()}
                                            className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${newPost.trim()
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105'
                                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        {posts.map((post) => (
                            <div key={post.id} className="rounded-xl sm:rounded-2xl shadow-sm border bg-gray-800 border-gray-700 overflow-hidden">
                                {/* Post Header */}
                                <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                                            <img src={post?.user?.avatar} alt="user_avatar" className='w-full h-full object-cover rounded-full' />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold text-white text-sm sm:text-base">{post.user.name}</h3>
                                                {post.user.isVerified && (
                                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
                                                <span>@{post.user.username}</span>
                                                <span>•</span>
                                                <span>{post.timestamp}</span>
                                                {post.location && (
                                                    <>
                                                        <span className="hidden sm:inline">•</span>
                                                        <div className="hidden sm:flex items-center space-x-1">
                                                            <MapPin className="w-3 h-3" />
                                                            <span className="truncate max-w-24">{post.location}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="p-2 rounded-full hover:bg-gray-700 text-gray-400">
                                        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Button>
                                </div>

                                {/* Post Content */}
                                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                                    <p className="leading-relaxed text-gray-300 text-sm sm:text-base">{post.content}</p>
                                </div>

                                {/* Post Image */}
                                {post.image && (
                                    <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                        {!post?.image ? (
                                            <div className="flex items-center justify-center h-full w-full bg-gray-800 rounded-lg">
                                                <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
                                            </div>
                                        ) : (
                                            <img
                                                src={post.image}
                                                alt="Post Image"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Post Actions */}
                                <div className="p-4 sm:p-6 pt-3 sm:pt-4 flex justify-between">
                                    <div className="flex items-center space-x-4 sm:space-x-6">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center space-x-1 sm:space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                                                }`}
                                        >
                                            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                            <span className="text-xs sm:text-sm font-medium">{post.likes}</span>
                                        </button>
                                        <Link href='/message'>
                                            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-blue-400">
                                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="text-xs sm:text-sm font-medium">{post.comments}</span>
                                            </button>
                                        </Link>
                                        <button className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-green-400">
                                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-xs sm:text-sm font-medium">{post.shares}</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleSave(post.id)}
                                        className={`${post.isSaved ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'
                                            }`}
                                    >
                                        <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${post.isSaved ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Sidebar - Hidden on mobile and tablet, visible on large screens */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20 space-y-6">
                            {/* Suggested Users */}
                            <div className="rounded-2xl p-6 shadow-sm border bg-gray-800 border-gray-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="w-5 h-5 text-pink-500" />
                                    <h3 className="font-bold text-white">Suggested for you</h3>
                                </div>
                                <div className="space-y-4">
                                    {loading ? (
                                        <div className="flex justify-center items-center py-6">
                                            <div className="w-6 h-6 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        users.slice(0, 5).map((user: User) => (
                                            <div key={user.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center overflow-hidden">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                                        ) : (
                                                            <span className="text-white font-semibold text-sm">
                                                                {user.name.charAt(0)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm text-white">{user.name}</h4>
                                                        <p className="text-xs text-gray-400">{user?.mutualFriends || Math.floor(Math.random() * 10)} mutual friends</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleFollow(user.id)}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isFollowing
                                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                                                        }`}
                                                >
                                                    {user.isFollowing ? 'Following' : 'Follow'}
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="rounded-2xl p-6 shadow-sm border bg-gray-800 border-gray-700">
                                <h3 className="font-bold mb-4 text-white">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-pink-900/30">
                                            <Users className="w-4 h-4 text-pink-400" />
                                        </div>
                                        <span className="text-sm text-gray-300">Find Friends</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-900/30">
                                            <Camera className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="text-sm text-gray-300">Create Story</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 text-left">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-900/30">
                                            <Settings className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-sm text-gray-300">Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Navigation - Shows only on small screens */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-t border-gray-700 z-40">
                    <div className="flex justify-around items-center py-2">
                        <button className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-pink-400">
                            <Home className="w-5 h-5" />
                            <span className="text-xs">Home</span>
                        </button>
                        <button className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-pink-400">
                            <Search className="w-5 h-5" />
                            <span className="text-xs">Search</span>
                        </button>
                        <button className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-pink-400">
                            <Plus className="w-5 h-5" />
                            <span className="text-xs">Create</span>
                        </button>
                        <button className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-pink-400 relative">
                            <Bell className="w-5 h-5" />
                            <span className="text-xs">Activity</span>
                            <span className="absolute -top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <Link href='/profile'>
                            <button className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-pink-400">
                                <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full overflow-hidden">
                                    <img src={currentUser?.avatar} alt="" className='w-full h-full object-cover' />
                                </div>
                                <span className="text-xs">Profile</span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Trending Topics - Shows as a horizontal scrollable section on mobile/tablet */}
                <div className="lg:hidden mt-6 mb-20 sm:mb-0">
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border bg-gray-800 border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-pink-500" />
                            <h3 className="font-bold text-white">Trending Topics</h3>
                        </div>
                        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                            {trendingTopics.map((topic) => (
                                <div key={topic.id} className="flex-shrink-0 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer min-w-36">
                                    <h4 className="font-semibold text-pink-500 text-sm">{topic.title}</h4>
                                    <p className="text-xs text-gray-400">{topic.posts.toLocaleString()} posts</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Suggested Users - Shows on tablet and mobile */}
                <div className="lg:hidden mt-4 mb-20 sm:mb-4">
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border bg-gray-800 border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-pink-500" />
                            <h3 className="font-bold text-white">People you may know</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {loading ? (
                                <div className="col-span-2 sm:col-span-3 flex justify-center items-center py-6">
                                    <div className="w-6 h-6 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                users.slice(0, 6).map((user: User) => (
                                    <div key={user.id} className="p-3 rounded-lg bg-gray-700 text-center">
                                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center overflow-hidden">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                <span className="text-white font-semibold text-sm">
                                                    {user.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-sm text-white mb-1 truncate">{user.name}</h4>
                                        <p className="text-xs text-gray-400 mb-3">{user?.mutualFriends || Math.floor(Math.random() * 10)} mutual</p>
                                        <button
                                            onClick={() => handleFollow(user.id)}
                                            className={`w-full px-3 py-1 rounded-full text-xs font-semibold ${user.isFollowing
                                                ? 'bg-gray-600 text-gray-300'
                                                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                                                }`}
                                        >
                                            {user.isFollowing ? 'Following' : 'Follow'}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}