import api from './api';

export interface Assignment {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    maxScore: number;
    courseId: string;
    batchId?: string;
    status?: 'pending' | 'submitted' | 'graded';
    submission?: {
        submittedAt: string;
        score?: number;
        feedback?: string;
    };
}

export const assignmentService = {
    getMyAssignments: async () => {
        const response = await api.get('/assignments/my-assignments');
        return response.data;
    },

    getAssignmentById: async (assignmentId: string) => {
        const response = await api.get(`/assignments/${assignmentId}`);
        return response.data;
    },

    submitAssignment: async (assignmentId: string, formData: FormData) => {
        const response = await api.post(`/assignments/${assignmentId}/submit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
