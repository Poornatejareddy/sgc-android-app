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
    login: (credentials: any) => Promise<any>;
    logout: () => Promise<void>;
    signup: (data: any) => Promise<void>;
    isAuthenticated: boolean;
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
            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Auth check timeout')), 5000)
            );

            const userPromise = authService.getCurrentUser();

            const userData = await Promise.race([userPromise, timeoutPromise]) as any;
            setUser(userData.user || userData);
        } catch (error) {
            console.log('Auth check failed (expected if not logged in):', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: any) => {
        const data = await authService.login(credentials);
        setUser(data.user);
        return data; // Return the full response
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    const signup = async (data: any) => {
        const response = await authService.signup(data);
        setUser(response.user || response.data?.user);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            signup,
            isAuthenticated: !!user
        }}>
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
