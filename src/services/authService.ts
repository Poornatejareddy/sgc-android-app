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
        console.log('Signup request to:', '/auth/signup');
        const response = await api.post('/auth/signup', data);
        console.log('Signup response:', response.data);
        return response.data; // Returns { message, email }
    },

    // Step 2: Verify email with OTP
    verifyEmail: async (data: VerifyEmailData) => {
        console.log('Verify email request to:', '/auth/verify-email');
        const response = await api.post('/auth/verify-email', data);
        console.log('Verify email response:', response.data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // Resend OTP
    resendOTP: async (email: string) => {
        console.log('Resend OTP request to:', '/auth/resend-verification-otp');
        const response = await api.post('/auth/resend-verification-otp', { email });
        console.log('Resend OTP response:', response.data);
        return response.data;
    },

    // Login
    login: async (credentials: LoginCredentials) => {
        console.log('Login request to:', api.defaults.baseURL + '/auth/login');
        console.log('Login credentials:', { email: credentials.email, password: '***' });

        try {
            const response = await api.post('/auth/login', credentials);
            console.log('Login response status:', response.status);
            console.log('Login response data:', response.data);

            if (response.data.token) {
                console.log('Storing token in localStorage');
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error: any) {
            console.error('Login request failed');
            console.error('Error status:', error.response?.status);
            console.error('Error data:', error.response?.data);
            console.error('Error message:', error.message);
            throw error;
        }
    },

    // Logout
    logout: async () => {
        console.log('Logout request');
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
        console.log('Get current user request to:', '/auth/me');
        try {
            const response = await api.get('/auth/me');
            console.log('Get current user response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Get current user failed:', error.response?.status, error.message);
            throw error;
        }
    }
};
