import api from './api';

export interface ForumPost {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: string;
    };
    category?: string;
    likes: string[];
    replyCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface ForumReply {
    _id: string;
    postId: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: string;
    };
    createdAt: string;
}

export const forumService = {
    // Get all forum posts
    getAllPosts: async (): Promise<ForumPost[]> => {
        const response = await api.get('/forum/posts');
        return response.data;
    },

    // Get single post with replies
    getPost: async (postId: string): Promise<{ post: ForumPost; replies: ForumReply[] }> => {
        const response = await api.get(`/forum/posts/${postId}`);
        return response.data;
    },

    // Create new post
    createPost: async (title: string, content: string, category?: string): Promise<ForumPost> => {
        const response = await api.post('/forum/posts', { title, content, category });
        return response.data;
    },

    // Reply to post
    createReply: async (postId: string, content: string): Promise<ForumReply> => {
        const response = await api.post(`/forum/posts/${postId}/replies`, { content });
        return response.data;
    },

    // Like/unlike post
    toggleLike: async (postId: string): Promise<void> => {
        await api.post(`/forum/posts/${postId}/like`);
    }
};
