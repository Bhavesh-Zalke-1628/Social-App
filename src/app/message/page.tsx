'use client';

import {
    MessageCircle,
    ArrowLeft,
    Menu,
    Video,
    Phone,
    Sparkles,
    Send,
    Search,
    MoreVertical,
    Smile,
    Paperclip,
    Mic,
    Image,
    Check,
    CheckCheck,
    Circle,
    Settings,
    Archive,
    X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
    status?: 'sent' | 'delivered' | 'read';
    type?: 'text' | 'image' | 'file';
}

interface Conversation {
    id: number;
    user: string;
    avatar: string;
    lastSeen?: string;
    isOnline: boolean;
    unreadCount: number;
    messages: Message[];
    isTyping?: boolean;
}

const conversationsData: Conversation[] = [
    {
        id: 1,
        user: 'Alice Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        unreadCount: 2,
        messages: [
            { id: 1, text: 'Hey, how are you?', sender: 'other', timestamp: '10:00 AM', status: 'read' },
            { id: 2, text: 'I am good, thanks! How about you?', sender: 'me', timestamp: '10:02 AM', status: 'read' },
            { id: 3, text: 'Doing great, just working on the new project. The design looks amazing!', sender: 'other', timestamp: '10:05 AM', status: 'delivered' },
            { id: 4, text: 'That sounds exciting! Can\'t wait to see it.', sender: 'me', timestamp: '10:07 AM', status: 'sent' },
        ],
        isTyping: false,
    },
    {
        id: 2,
        user: 'Bob Smith',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: 'Last seen 2 hours ago',
        unreadCount: 0,
        messages: [
            { id: 1, text: 'Can you send me the files?', sender: 'other', timestamp: 'Yesterday', status: 'read' },
            { id: 2, text: 'Sure, I will send them today.', sender: 'me', timestamp: 'Yesterday', status: 'read' },
            { id: 3, text: 'Perfect, thanks a lot!', sender: 'other', timestamp: 'Yesterday', status: 'read' },
        ],
    },
    {
        id: 3,
        user: 'Aadinath Kore',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        unreadCount: 5,
        messages: [
            { id: 1, text: 'The meeting went really well today!', sender: 'other', timestamp: '2:30 PM', status: 'read' },
            { id: 2, text: 'That\'s awesome to hear!', sender: 'me', timestamp: '2:32 PM', status: 'read' },
            { id: 3, text: 'We should celebrate sometime soon', sender: 'other', timestamp: '2:35 PM', status: 'delivered' },
        ],
        isTyping: true,
    },
    {
        id: 4,
        user: 'Siddu Kumar',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: 'Last seen yesterday',
        unreadCount: 1,
        messages: [
            { id: 1, text: 'Hey! How was your weekend?', sender: 'other', timestamp: 'Yesterday', status: 'read' },
            { id: 2, text: 'It was great! Went hiking.', sender: 'me', timestamp: 'Yesterday', status: 'read' },
            { id: 3, text: 'Sounds fun! Send me some photos', sender: 'other', timestamp: 'Yesterday', status: 'delivered' },
        ],
    },
    {
        id: 5,
        user: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        unreadCount: 0,
        messages: [
            { id: 1, text: 'Thanks for your help with the presentation!', sender: 'other', timestamp: '4:15 PM', status: 'read' },
            { id: 2, text: 'Happy to help anytime! 😊', sender: 'me', timestamp: '4:17 PM', status: 'read' },
        ],
    },
];

const StatusIcon = ({ status }: { status?: string }) => {
    switch (status) {
        case 'sent':
            return <Check className="w-3 h-3 text-gray-400" />;
        case 'delivered':
            return <CheckCheck className="w-3 h-3 text-gray-400" />;
        case 'read':
            return <CheckCheck className="w-3 h-3 text-blue-400" />;
        default:
            return null;
    }
};

const ConversationItem = ({
    conversation,
    isSelected,
    onClick
}: {
    conversation: Conversation;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <li
        onClick={onClick}
        className={`relative flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 hover:bg-gray-800/50 ${isSelected ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-r-2 border-pink-500' : ''
            }`}
    >
        <div className="relative">
            <img
                src={conversation.avatar}
                alt={conversation.user}
                className="w-12 h-12 rounded-full object-cover"
            />
            {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            )}
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-white text-sm truncate">
                    {conversation.user}
                </p>
                <span className="text-xs text-gray-400 flex-shrink-0">
                    {conversation.messages[conversation.messages.length - 1]?.timestamp}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 truncate flex-1">
                    {conversation.isTyping ? (
                        <span className="text-green-400 italic">typing...</span>
                    ) : (
                        conversation.messages[conversation.messages.length - 1]?.text || 'No messages yet'
                    )}
                </p>
                {conversation.unreadCount > 0 && (
                    <div className="ml-2 px-2 py-1 bg-pink-500 text-white text-xs rounded-full font-medium min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                    </div>
                )}
            </div>
        </div>
    </li>
);

export default function MessageDashboard() {
    const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [messageText, setMessageText] = useState('');
    const [conversations, setConversations] = useState(conversationsData);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedConversation = conversations.find((conv) => conv.id === selectedConvId) ?? null;

    const filteredConversations = conversations.filter(conv =>
        conv.user.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedConversation?.messages]);

    const handleConversationSelect = (convId: number) => {
        setSelectedConvId(convId);
        setSidebarOpen(false);

        // Mark messages as read
        setConversations(prev =>
            prev.map(conv =>
                conv.id === convId ? { ...conv, unreadCount: 0 } : conv
            )
        );
    };

    const handleSendMessage = () => {
        if (!messageText.trim() || !selectedConversation) return;

        const newMessage: Message = {
            id: Date.now(),
            text: messageText.trim(),
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setConversations(prev =>
            prev.map(conv =>
                conv.id === selectedConversation.id
                    ? { ...conv, messages: [...conv.messages, newMessage] }
                    : conv
            )
        );

        setMessageText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:relative z-50 md:z-auto
                w-80 lg:w-96 h-full
                border-r border-gray-700/50 bg-gray-900
                transform transition-all duration-300 ease-in-out
                overflow-hidden flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                ${selectedConversation && !sidebarOpen ? 'hidden md:block' : ''}
            `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                // onClick={() }
                                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                title="Back to previous page"
                            >
                                <ArrowLeft className="w-4 h-4 text-gray-400" />
                            </button>
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MessageCircle className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Messages
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <Settings className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="md:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {filteredConversations.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500">No conversations found</p>
                        </div>
                    ) : (
                        <ul className="py-2">
                            {filteredConversations.map((conv) => (
                                <ConversationItem
                                    key={conv.id}
                                    conversation={conv}
                                    isSelected={conv.id === selectedConvId}
                                    onClick={() => handleConversationSelect(conv.id)}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {/* New Conversation Button */}
                <div className="p-4 border-t border-gray-700/50">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                        <Sparkles className="w-4 h-4" />
                        Start New Chat
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <header className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <button
                                    // onClick={}
                                    className="md:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                    title="Close chat"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="hidden md:block lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                    title="Show conversations"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                <div className="relative">
                                    <img
                                        src={selectedConversation.avatar}
                                        alt={selectedConversation.user}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {selectedConversation.isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        {selectedConversation.user}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        {selectedConversation.isOnline ? 'Online' : selectedConversation.lastSeen}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors" title="Voice call">
                                    <Phone className="w-5 h-5 text-gray-300" />
                                </button>
                                <button className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors" title="Video call">
                                    <Video className="w-5 h-5 text-gray-300" />
                                </button>
                                <button
                                    // onClick={handleCloseChat}
                                    className="hidden md:block p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors"
                                    title="Close chat"
                                >
                                    <X className="w-5 h-5 text-gray-300" />
                                </button>
                                <button className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors" title="More options">
                                    <MoreVertical className="w-5 h-5 text-gray-300" />
                                </button>
                            </div>
                        </header>

                        {/* Messages */}
                        <main className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {selectedConversation.messages.map((msg, index) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-2xl shadow-lg ${msg.sender === 'me'
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-md'
                                            : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700/50'
                                            }`}
                                    >
                                        <p className="text-sm break-words leading-relaxed">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-2 ${msg.sender === 'me' ? 'text-pink-100' : 'text-gray-400'
                                            }`}>
                                            <span className="text-xs">
                                                {msg.timestamp}
                                            </span>
                                            {msg.sender === 'me' && <StatusIcon status={msg.status} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </main>

                        {/* Message Input */}
                        <footer className="p-4 border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-md">
                            <div className="flex items-end gap-3">
                                <div className="flex gap-2">
                                    <button className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <Paperclip className="w-5 h-5 text-gray-400" />
                                    </button>
                                    <button className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <Image className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                <div className="flex-1 relative">
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="w-full max-h-32 px-4 py-3 pr-12 bg-gray-800 border border-gray-700/50 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                                        rows={1}
                                        style={{ minHeight: '44px' }}
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <Smile className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors">
                                        <Mic className="w-5 h-5 text-gray-400" />
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!messageText.trim()}
                                        className="p-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                                    >
                                        <Send className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </footer>
                    </>
                ) : (
                    // Empty State
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden absolute top-4 left-4 p-2.5 hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="mb-8 relative">
                            <div className="animate-pulse">
                                <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-pink-500/10">
                                    <MessageCircle className="w-12 h-12 text-pink-400" />
                                </div>
                            </div>
                            <div className="absolute inset-0 animate-ping">
                                <div className="w-24 h-24 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-full"></div>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            Welcome to Messages
                        </h2>

                        <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed mb-8">
                            Select a conversation from the sidebar to start chatting with your friends.
                            Share moments, stay connected, and make every message count ✨
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                Browse Conversations
                            </button>
                            <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700/50 rounded-xl text-gray-300 font-semibold transition-all duration-200 transform hover:scale-105">
                                Start New Chat
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .scrollbar-thin {
                    scrollbar-width: thin;
                }
                .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
                    background-color: rgb(55 65 81);
                    border-radius: 0.5rem;
                }
                .scrollbar-track-transparent::-webkit-scrollbar-track {
                    background-color: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
            `}</style>
        </div>
    );
}