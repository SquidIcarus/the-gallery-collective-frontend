import { createContext, useState, useEffect } from 'react';
import authService from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            return data;
        } catch (error) {
            throw error;
        }
    };
    
    return (
        <AuthContext.Provider 
        value={{ 
            isAuthenticated, 
            isLoading, 
            login, 
            logout, 
            register }}>
        {children}
        </AuthContext.Provider>
    );
};


