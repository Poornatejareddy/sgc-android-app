import { useEffect, useState } from 'react';
import BottomNav from '../components/layout/BottomNav';
import { chatService, type Conversation, type Message } from '../services/chatService';
import { Loader2, Send, ArrowLeft, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

export default function Messages() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation._id);
            chatService.markAsRead(selectedConversation._id).catch(console.error);
        }
    }, [selectedConversation]);

    const fetchConversations = async () => {
        try {
            const data = await chatService.getConversations();
            setConversations(data);
        } catch (error) {
            console.error('Failed to fetch conversations', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (conversationId: string) => {
        try {
            const data = await chatService.getMessages(conversationId);
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
            toast.error('Failed to load messages');
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || sending) return;

        setSending(true);
        try {
            const message = await chatService.sendMessage(selectedConversation._id, newMessage.trim());
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message', error);
            toast.error('Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const getOtherParticipant = (conversation: Conversation) => {
        return conversation.participants.find(p => p._id !== user?._id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Chat View
    if (selectedConversation) {
        const otherUser = getOtherParticipant(selectedConversation);

        return (
            <div className="h-screen flex flex-col bg-gray-50">
                {/* Chat Header */}
                <header className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                    <button
                        onClick={() => setSelectedConversation(null)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-900 truncate">{otherUser?.name || 'Chat'}</h1>
                        <p className="text-xs text-gray-500 capitalize">{otherUser?.role || ''}</p>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                        const isOwn = message.sender._id === user?._id;
                        return (
                            <div key={message._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] ${isOwn ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'} rounded-2xl px-4 py-2 shadow-sm`}>
                                    {!isOwn && (
                                        <p className="text-xs font-semibold mb-1 opacity-70">{message.sender.name}</p>
                                    )}
                                    <p className="text-sm break-words">{message.content}</p>
                                    <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {format(new Date(message.createdAt), 'hh:mm a')}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-100 p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                            disabled={sending}
                        />
                        <Button
                            type="submit"
                            disabled={!newMessage.trim() || sending}
                            className="px-4 bg-blue-600 hover:bg-blue-700"
                        >
                            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    // Conversation List
    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </header>

            <main className="p-6">
                {conversations.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No conversations yet</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {conversations.map((conversation) => {
                            const otherUser = getOtherParticipant(conversation);
                            return (
                                <button
                                    key={conversation._id}
                                    onClick={() => setSelectedConversation(conversation)}
                                    className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform text-left"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">{otherUser?.name || 'Unknown'}</h3>
                                        {conversation.lastMessage && (
                                            <span className="text-xs text-gray-500">
                                                {format(new Date(conversation.lastMessage.createdAt), 'MMM dd')}
                                            </span>
                                        )}
                                    </div>
                                    {conversation.lastMessage && (
                                        <p className="text-sm text-gray-600 line-clamp-1">{conversation.lastMessage.content}</p>
                                    )}
                                    {conversation.unreadCount && conversation.unreadCount > 0 && (
                                        <div className="mt-2">
                                            <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                                {conversation.unreadCount} new
                                            </span>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
