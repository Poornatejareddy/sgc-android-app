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

interface VerifyEmailData {
    email: string;
    otp: string;
}

export const authService = {
    // Step 1: Signup - sends OTP to email
    signup: async (data: SignupData) => {
        const response = await api.post('/auth/signup', data);
        return response.data; // Returns { message, email }
    },

    // Step 2: Verify email with OTP
    verifyEmail: async (data: VerifyEmailData) => {
        const response = await api.post('/auth/verify-email', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // Resend OTP
    resendOTP: async (email: string) => {
        const response = await api.post('/auth/resend-verification-otp', { email });
        return response.data;
    },

    // Login
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // Logout
    logout: async () => {
        try {
            await api.get('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
        }
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
