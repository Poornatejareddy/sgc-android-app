import api from './api';

export interface Course {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    image?: string;
    instructorName?: string;
    batchCount?: number;
}

export const courseService = {
    getAllCourses: async () => {
        const response = await api.get('/courses'); // Public endpoint
        return response.data;
    },

    getCourseBySlug: async (slug: string) => {
        const response = await api.get(`/courses/slug/${slug}`);
        return response.data;
    }
};
