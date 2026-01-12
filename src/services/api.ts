import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized (e.g., redirect to login)
            // window.location.href = '/login'; 
            // Better to handle in AuthContext
        }
        return Promise.reject(error);
    }
);

export default api;
