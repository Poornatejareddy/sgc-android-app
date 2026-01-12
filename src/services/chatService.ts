import api from './api';

export interface Message {
    _id: string;
    conversationId: string;
    sender: {
        _id: string;
        name: string;
        role: string;
    };
    content: string;
    type: 'text' | 'file';
    fileUrl?: string;
    createdAt: string;
    readBy: string[];
}

export interface Conversation {
    _id: string;
    participants: {
        _id: string;
        name: string;
        role: string;
    }[];
    lastMessage?: {
        content: string;
        createdAt: string;
    };
    unreadCount?: number;
    createdAt: string;
    updatedAt: string;
}

export const chatService = {
    // Get all conversations for current user
    getConversations: async (): Promise<Conversation[]> => {
        const response = await api.get('/chat/conversations');
        return response.data;
    },

    // Get messages for a specific conversation
    getMessages: async (conversationId: string): Promise<Message[]> => {
        const response = await api.get(`/chat/messages/${conversationId}`);
        return response.data;
    },

    // Send a new message
    sendMessage: async (conversationId: string, content: string): Promise<Message> => {
        const response = await api.post(`/chat/send`, {
            conversationId,
            content,
            type: 'text'
        });
        return response.data;
    },

    // Create or get a conversation
    createConversation: async (participantId: string): Promise<Conversation> => {
        const response = await api.post('/chat/start', {
            targetUserId: participantId
        });
        return response.data;
    },

    // Mark messages as read
    markAsRead: async (conversationId: string): Promise<void> => {
        await api.post(`/chat/read/${conversationId}`);
    }
};
