import React, { useState, ChangeEvent, FormEvent } from "react";
import { X, Image as ImageIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        content: string;
        media: string[];
        tags: string[];
    }) => void;
}

export default function CreatePostModal({
    isOpen,
    onClose,
    onSubmit,
}: CreatePostModalProps) {
    const [content, setContent] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
    const [tags, setTags] = useState<string>("");

    if (!isOpen) return null;

    function handleMediaChange(e: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prev) => [...prev, ...files]);
        setMediaPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    }

    function handleRemoveMedia(index: number) {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            content,
            media: mediaPreviews,
            tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
        });
        setContent("");
        setTags("");
        setSelectedFiles([]);
        setMediaPreviews([]);
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed z-50 inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-[#1e1e2f] text-gray-100 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative border border-gray-700"
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-800"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-gray-300" />
                        </button>

                        <h2 className="font-semibold text-xl mb-4">✨ Create a Post</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Content */}
                            <textarea
                                className="w-full border border-gray-700 rounded-xl p-3 resize-none bg-[#2a2a3b] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows={3}
                                maxLength={500}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="What's on your mind?"
                                required
                            />

                            {/* File uploader (dark dropzone) */}
                            <label className="block cursor-pointer">
                                <div className="border-2 border-dashed border-pink-500/60 hover:border-pink-500 rounded-xl p-4 flex flex-col items-center justify-center text-pink-400 hover:text-pink-500 transition">
                                    <ImageIcon className="w-6 h-6 mb-1" />
                                    <span className="text-sm font-medium">Add images or videos</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleMediaChange}
                                    />
                                </div>
                            </label>

                            {/* Media previews */}
                            {mediaPreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {mediaPreviews.map((src, i) => (
                                        <div
                                            key={i}
                                            className="relative group rounded-lg overflow-hidden border border-gray-700 bg-gray-800"
                                        >
                                            {src.match(/\.mp4$|\.webm$/) ? (
                                                <video
                                                    controls
                                                    className="object-cover w-full h-28"
                                                >
                                                    <source src={src} />
                                                </video>
                                            ) : (
                                                <img
                                                    src={src}
                                                    alt={`media-${i}`}
                                                    className="object-cover w-full h-28"
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMedia(i)}
                                                className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Tags */}
                            <input
                                type="text"
                                className="w-full border border-gray-700 rounded-xl p-2 bg-[#2a2a3b] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="Tags (comma separated, e.g. art,funny,2025)"
                            />

                            {/* Footer buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 font-semibold shadow-lg"
                                    disabled={!content && selectedFiles.length === 0}
                                >
                                    🚀 Post
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
