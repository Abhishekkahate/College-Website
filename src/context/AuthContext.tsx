import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { currentUser, mockAdmin } from '../data/mockData';

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
        // Check if user is already logged in (mock persistence)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (id: string, password: string, role: 'student' | 'admin', section?: string): Promise<boolean> => {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (role === 'admin') {
            if (id === mockAdmin.email && password === mockAdmin.password) {
                setUser(mockAdmin);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(mockAdmin));
                return true;
            }
        } else {
            // Student login
            if (
                id === currentUser.rollNo &&
                section?.toUpperCase() === currentUser.section &&
                password === currentUser.password
            ) {
                setUser(currentUser);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(currentUser));
                return true;
            }
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
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
