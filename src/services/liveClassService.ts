import api from './api';

export interface LiveClass {
    _id: string;
    title: string;
    description?: string;
    scheduledAt: string;
    duration: number;
    meetingLink: string;
    courseId: string;
    batchId?: string;
    status: 'scheduled' | 'live' | 'completed' | 'cancelled';
}

export const liveClassService = {
    getUpcomingClasses: async () => {
        const response = await api.get('/live-class/upcoming');
        return response.data;
    },

    getClassById: async (classId: string) => {
        const response = await api.get(`/live-class/${classId}`);
        return response.data;
    },

    getMyCourseClasses: async (courseId: string) => {
        const response = await api.get(`/live-class/course/${courseId}`);
        return response.data;
    }
};
