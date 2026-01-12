import api from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    signup: async (data: SignupData) => {
        const response = await api.post('/auth/signup', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
        }
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
