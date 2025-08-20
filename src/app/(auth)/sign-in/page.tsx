'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Github, Chrome } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            identifier: formData.email,
            password: formData.password,
        });

        if (res?.error) {
            setError(res.error); // Show error UI
        } else {
            toast.success("Login successfully", { duration: 3000, position: 'top-center' })
            router.push("/dashboard");
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-800 flex items-center justify-center p-6">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            SocialSphere
                        </span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/70">Sign in to continue your journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 bg-white/10 border border-white/30 rounded focus:ring-pink-400 focus:ring-2"
                                />
                                <span className="text-white/70 text-sm">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            Sign In
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white/60">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login (Google, GitHub ke liye NextAuth configure karna padega) */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => signIn("google")}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Chrome className="w-5 h-5" />
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={() => signIn("github")}
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </button>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8">
                        <p className="text-white/70">
                            Don't have an account?{' '}
                            <Link href="/sign-up" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
