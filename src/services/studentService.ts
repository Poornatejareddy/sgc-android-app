import api from './api';

export const studentService = {
    getDashboardStats: async () => {
        const response = await api.get('/student/dashboard-stats');
        return response.data;
    },

    getMyCourses: async () => {
        const response = await api.get('/enrollment/my-courses');
        return response.data;
    }
};
