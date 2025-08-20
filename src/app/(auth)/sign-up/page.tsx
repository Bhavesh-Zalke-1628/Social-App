// pages/signup.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, Github, Chrome, Check, Users } from 'lucide-react';
import axios, { AxiosError } from 'axios'
import { useDebounceValue } from 'usehooks-ts'
import { ApiResponse } from '@/types/response';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Signup() {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });


    const [debouncedUsername] = useDebounceValue(formData.username, 300);

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (debouncedUsername && debouncedUsername.length > 0) {
                setIsCheckingUsername(true);
                setUsernameMessage(''); // Reset message
                try {
                    const response = await axios.get<ApiResponse>(
                        `/api/check-username-unique?username=${debouncedUsername}`
                    );
                    setUsernameMessage(response.data.message);
                    if (!response) {
                        setUsernameMessage("username already taken");
                    }
                } catch (error: any) {
                    setUsernameMessage(error?.response?.data?.message)
                } finally {
                    setIsCheckingUsername(false);
                }
            } else {
                setUsernameMessage('');
                setIsCheckingUsername(false);
            }
        };
        checkUsernameUnique();
    }, [debouncedUsername]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear submit error when user starts typing
        if (submitError) {
            setSubmitError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setSubmitError("Passwords don't match!");
            return;
        }
        if (!formData.agreeToTerms) {
            setSubmitError('You must agree to the terms and conditions.');
            return;
        }

        // Check if username is still being checked
        if (isCheckingUsername) {
            setSubmitError('Please wait while we check username availability.');
            return;
        }


        // Check if username is available (assuming error message means unavailable)
        if (usernameMessage && usernameMessage.toLowerCase().includes('taken')) {
            setSubmitError('Please choose a different username.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/sign-up", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            // Handle successful signup
            // You might want to redirect or show success message here
            if (response.data.success) {
                toast.success(`${response?.data?.message}`, { duration: 5000 })
                router.push('/sign-in')
                setFormData(
                    {
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        agreeToTerms: false
                    }
                )
            }

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setSubmitError(
                axiosError.response?.data.message ?? 'An error occurred during signup'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const passwordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const getStrengthColor = (strength: number) => {
        if (strength < 2) return 'bg-red-500';
        if (strength < 4) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthText = (strength: number) => {
        if (strength < 2) return 'Weak';
        if (strength < 4) return 'Medium';
        return 'Strong';
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

                {/* Signup Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Join SocialSphere</h1>
                        <p className="text-white/70">Create your account and start connecting</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {submitError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                                <p className="text-red-400 text-sm">{submitError}</p>
                            </div>
                        )}

                        {/* Username Field */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter your username"
                                    required
                                />
                                {isCheckingUsername && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white/50"></div>
                                    </div>
                                )}
                            </div>
                            {/* Username feedback */}
                            {usernameMessage && (
                                <div className="mt-2">
                                    <p className={`text-xs ${usernameMessage.toLowerCase().includes('available') ? 'text-green-400' : 'text-red-400'}`}>
                                        {usernameMessage}
                                    </p>
                                </div>
                            )}
                        </div>

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
                                    placeholder="Create a strong password"
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

                            {/* Password Strength */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-white/10 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength(formData.password))}`}
                                                style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-white/60">
                                            {getStrengthText(passwordStrength(formData.password))}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Match Indicator */}
                            {formData.confirmPassword && (
                                <div className="mt-2 flex items-center gap-2">
                                    {formData.password === formData.confirmPassword ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-500" />
                                            <span className="text-xs text-green-500">Passwords match</span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-red-500">Passwords don't match</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        <div>
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="w-4 h-4 mt-1 bg-white/10 border border-white/30 rounded focus:ring-pink-400 focus:ring-2"
                                    required
                                />
                                <span className="text-white/70 text-sm leading-relaxed">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-pink-400 hover:text-pink-300 transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-pink-400 hover:text-pink-300 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            disabled={isSubmitting || isCheckingUsername || !formData.agreeToTerms}
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white/60">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        {/* Social Signup */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Chrome className="w-5 h-5" />
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Github className="w-5 h-5" />
                                GitHub
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-8">
                        <p className="text-white/70">
                            Already have an account?{' '}
                            <Link href="/sign-in" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}