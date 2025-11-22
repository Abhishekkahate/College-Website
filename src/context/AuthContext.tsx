import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import * as authService from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (id: string, password: string, role: 'student' | 'admin', section?: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (id: string, password: string, role: 'student' | 'admin', section?: string): Promise<boolean> => {
        let result;

        if (role === 'admin') {
            // Admin login with email
            result = await authService.loginAdmin(id, password);
        } else {
            // Student login with roll number and section
            if (!section) {
                return false;
            }
            result = await authService.loginStudent(id, section, password);
        }

        if (result.success && result.user) {
            setUser(result.user);
            setIsAuthenticated(true);
            return true;
        }

        return false;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 text-gray-900 dark:text-white">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
