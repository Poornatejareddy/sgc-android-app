import api from './api';

export const materialService = {
    getCourseMaterials: async (courseId: string) => {
        const response = await api.get(`/material/course/${courseId}`);
        return response.data;
    },

    getMaterialById: async (materialId: string) => {
        const response = await api.get(`/material/${materialId}`);
        return response.data;
    },

    markAsViewed: async (materialId: string) => {
        const response = await api.post(`/material/${materialId}/mark-viewed`);
        return response.data;
    },

    getCourseProgress: async (courseId: string) => {
        const response = await api.get(`/material-progress/course/${courseId}`);
        return response.data;
    }
};
