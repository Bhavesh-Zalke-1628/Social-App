'use client'
import React, { useState } from 'react';
import { ImagePlus, X, Hash, Send, Loader2, AlertCircle, Sparkles } from 'lucide-react';

interface FormData {
    content: string;
    media: string[];
    tags: string[];
}

interface ValidationErrors {
    content?: string;
    media?: string;
    tags?: string;
    general?: string;
}

export default function CreatePostForm() {
    const [formData, setFormData] = useState<FormData>({
        content: '',
        media: [],
        tags: []
    });

    const [currentMediaUrl, setCurrentMediaUrl] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        // Validate content
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        } else if (formData.content.length > 500) {
            newErrors.content = 'Content cannot exceed 500 characters';
        }

        // Validate media URLs
        formData.media.forEach((url, index) => {
            try {
                new URL(url);
            } catch {
                newErrors.media = `Invalid URL at position ${index + 1}`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, content: e.target.value }));
        if (errors.content) {
            setErrors(prev => ({ ...prev, content: undefined }));
        }
    };

    const addMediaUrl = () => {
        if (!currentMediaUrl.trim()) return;

        try {
            new URL(currentMediaUrl);
            setFormData(prev => ({
                ...prev,
                media: [...prev.media, currentMediaUrl.trim()]
            }));
            setCurrentMediaUrl('');
            if (errors.media) {
                setErrors(prev => ({ ...prev, media: undefined }));
            }
        } catch {
            setErrors(prev => ({ ...prev, media: 'Invalid URL format' }));
        }
    };

    const removeMediaUrl = (index: number) => {
        setFormData(prev => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index)
        }));
    };

    const addTag = () => {
        const tag = currentTag.trim().toLowerCase();
        if (!tag) return;

        if (formData.tags.includes(tag)) {
            setErrors(prev => ({ ...prev, tags: 'Tag already exists' }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, tag]
        }));
        setCurrentTag('');
        if (errors.tags) {
            setErrors(prev => ({ ...prev, tags: undefined }));
        }
    };

    const removeTag = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrors({});

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.details) {
                    // Handle validation errors from server
                    const serverErrors: ValidationErrors = {};
                    result.details.forEach((detail: any) => {
                        serverErrors[detail.field as keyof ValidationErrors] = detail.message;
                    });
                    setErrors(serverErrors);
                } else {
                    setErrors({ general: result.error || 'Failed to create post' });
                }
                setSubmitStatus('error');
            } else {
                setSubmitStatus('success');
                // Reset form on success
                setFormData({ content: '', media: [], tags: [] });
                setTimeout(() => setSubmitStatus('idle'), 3000);
            }
        } catch (error) {
            setErrors({ general: 'Network error. Please try again.' });
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const characterCount = formData.content.length;
    const isOverLimit = characterCount > 500;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Create New Post
                </h2>
            </div>

            <div className="space-y-6">
                {/* Content Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        What's on your mind?
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={handleContentChange}
                        placeholder="Share your thoughts with the world..."
                        rows={4}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.content
                            ? 'border-red-500 bg-red-900/20 ring-2 ring-red-500/20'
                            : isOverLimit
                                ? 'border-orange-500 bg-orange-900/20 ring-2 ring-orange-500/20'
                                : 'border-gray-700 hover:border-gray-600'
                            } text-white placeholder-gray-500`}
                        disabled={isSubmitting}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            {errors.content && (
                                <p className="text-red-400 text-sm flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.content}
                                </p>
                            )}
                        </div>
                        <span className={`text-sm font-medium ${isOverLimit
                            ? 'text-red-400'
                            : characterCount > 400
                                ? 'text-orange-400'
                                : characterCount > 250
                                    ? 'text-yellow-400'
                                    : 'text-gray-400'
                            }`}>
                            {characterCount}/500
                        </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-800 rounded-full h-1 mt-1">
                        <div
                            className={`h-1 rounded-full transition-all duration-300 ${isOverLimit
                                ? 'bg-red-500'
                                : characterCount > 400
                                    ? 'bg-orange-500'
                                    : characterCount > 250
                                        ? 'bg-yellow-500'
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                }`}
                            style={{ width: `${Math.min((characterCount / 500) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Media URLs Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <ImagePlus className="w-4 h-4" />
                        Media (Images/Videos)
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="url"
                            value={currentMediaUrl}
                            onChange={(e) => setCurrentMediaUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-600 transition-colors text-white placeholder-gray-500"
                            disabled={isSubmitting}
                        />
                        <button
                            onClick={addMediaUrl}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                            disabled={isSubmitting}
                        >
                            <ImagePlus className="w-4 h-4" />
                            Add
                        </button>
                    </div>

                    {errors.media && (
                        <p className="text-red-400 text-sm mb-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.media}
                        </p>
                    )}

                    {formData.media.length > 0 && (
                        <div className="space-y-2">
                            {formData.media.map((url, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/60 border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-colors">
                                    <img
                                        src={url}
                                        alt={`Media ${index + 1}`}
                                        className="w-12 h-12 object-cover rounded border border-gray-600"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                    <span className="flex-1 text-sm text-gray-300 truncate">
                                        {url}
                                    </span>
                                    <button
                                        onClick={() => removeMediaUrl(index)}
                                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tags Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            placeholder="react, javascript, coding..."
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-gray-600 transition-colors text-white placeholder-gray-500"
                            disabled={isSubmitting}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <button
                            onClick={addTag}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
                            disabled={isSubmitting}
                        >
                            <Hash className="w-4 h-4" />
                            Add
                        </button>
                    </div>

                    {errors.tags && (
                        <p className="text-red-400 text-sm mb-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.tags}
                        </p>
                    )}

                    {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-500/30 text-purple-200 rounded-full text-sm hover:from-purple-900/80 hover:to-pink-900/80 transition-colors"
                                >
                                    <Hash className="w-3 h-3" />
                                    {tag}
                                    <button
                                        onClick={() => removeTag(index)}
                                        className="text-purple-300 hover:text-purple-100 ml-1"
                                        disabled={isSubmitting}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* General Error */}
                {errors.general && (
                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
                        <p className="text-red-300 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.general}
                        </p>
                    </div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg backdrop-blur-sm">
                        <p className="text-green-300 text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Post created successfully! 🎉
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isOverLimit}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25 disabled:shadow-none"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating Post...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Create Post
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}