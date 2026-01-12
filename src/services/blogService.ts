import api from './api';

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    image?: string;
    authorName: string;
    createdAt: string;
    likes: string[];
    comments: any[];
    views: number;
    tags: string[];
}

export const blogService = {
    getAllBlogs: async () => {
        const response = await api.get('/blogs');
        return response.data;
    },

    getBlogBySlug: async (slug: string) => {
        const response = await api.get(`/blogs/${slug}`);
        return response.data;
    },

    likeBlog: async (id: string) => {
        const response = await api.post(`/blogs/${id}/like`);
        return response.data;
    }
};
