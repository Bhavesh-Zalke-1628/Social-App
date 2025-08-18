'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
}

interface Conversation {
    id: number;
    user: string;
    avatar: string;
    messages: Message[];
}

const conversationsData: Conversation[] = [
    {
        id: 1,
        user: 'Alice Johnson',
        avatar: 'https://i.pravatar.cc/40?img=1',
        messages: [
            { id: 1, text: 'Hey, how are you?', sender: 'other', timestamp: '10:00 AM' },
            { id: 2, text: 'I am good, thanks! How about you?', sender: 'me', timestamp: '10:02 AM' },
            { id: 3, text: 'Doing great, just working on the project.', sender: 'other', timestamp: '10:05 AM' },
        ],
    },
    {
        id: 2,
        user: 'Bob Smith',
        avatar: 'https://i.pravatar.cc/40?img=2',
        messages: [
            { id: 1, text: 'Can you send me the files?', sender: 'other', timestamp: 'Yesterday' },
            { id: 2, text: 'Sure, I will send them today.', sender: 'me', timestamp: 'Yesterday' },
        ],
    },
    {
        id: 3,
        user: 'Aadinath',
        avatar: 'https://i.pravatar.cc/40?img=3',
        messages: [
            { id: 1, text: 'Can you send me the files?', sender: 'other', timestamp: 'Yesterday' },
            { id: 2, text: 'Sure, I will send them today.', sender: 'me', timestamp: 'Yesterday' },
        ],
    },
    {
        id: 2,
        user: 'Siddu',
        avatar: 'https://i.pravatar.cc/40?img=4',
        messages: [
            { id: 1, text: 'Can you send me the files?', sender: 'other', timestamp: 'Yesterday' },
            { id: 2, text: 'Sure, I will send them today.', sender: 'me', timestamp: 'Yesterday' },
        ],
    },
];

export default function MessageDashboard() {
    const [selectedConvId, setSelectedConvId] = useState<number | null>(null);

    const selectedConversation =
        conversationsData.find((conv) => conv.id === selectedConvId) ?? null;

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-semibold p-4 border-b border-gray-700">Messages</h2>
                <ul>
                    {conversationsData.map((conv) => (
                        <li
                            key={conv.id}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-700 ${conv.id === selectedConvId ? 'bg-gray-700' : ''
                                }`}
                            onClick={() => setSelectedConvId(conv.id)}
                        >
                            <img
                                src={conv.avatar}
                                alt={conv.user}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-semibold">{conv.user}</p>
                                <p className="text-sm text-gray-400 truncate max-w-xs">
                                    {conv.messages[conv.messages.length - 1]?.text || 'No messages yet'}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <>
                        {/* Chat header */}
                        <header className="p-4 border-b border-gray-700">
                            <h3 className="text-lg font-semibold">{selectedConversation.user}</h3>
                        </header>

                        {/* Messages */}
                        <main className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
                            {selectedConversation.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`max-w-md px-4 py-2 rounded-lg ${msg.sender === 'me'
                                        ? 'bg-pink-600 self-end'
                                        : 'bg-gray-700 self-start'
                                        }`}
                                >
                                    <p>{msg.text}</p>
                                    <span className="block text-xs text-gray-400 text-right mt-1">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            ))}
                        </main>

                        {/* Input */}
                        <footer className="p-4 border-t border-gray-700">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert('Send message feature not implemented in this example.');
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 rounded-lg bg-gray-800 px-4 py-2 border border-gray-600 focus:outline-none focus:border-pink-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition"
                                >
                                    Send
                                </button>
                            </form>
                        </footer>
                    </>
                ) : (
                    // Empty state
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <div className="animate-bounce">
                            <MessageCircle className="w-20 h-20 mb-4 text-pink-500 drop-shadow-lg" />
                        </div>

                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                            Start a Conversation
                        </h2>

                        <p className="text-gray-400 mt-2 max-w-sm">
                            Select a friend from the sidebar and begin chatting instantly.
                            Stay connected, share updates, and make conversations fun ✨
                        </p>

                        <button
                            onClick={() => alert('Scroll sidebar to choose a chat 👀')}
                            className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold shadow-md transition transform hover:scale-105"
                        >
                            Browse Conversations
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
