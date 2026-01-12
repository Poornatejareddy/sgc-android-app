import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'mentor' | 'admin';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    signup: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData.user || userData); // Adjust based on API response structure
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: any) => {
        const data = await authService.login(credentials);
        setUser(data.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const signup = async (data: any) => {
        await authService.signup(data);
        await checkUser(); // Auto login or fetch user
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
