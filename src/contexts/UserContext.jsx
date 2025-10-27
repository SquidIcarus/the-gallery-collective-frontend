import { createContext, useState, useEffect } from 'react';
import authService from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            setIsAuthenticated(authenticated);

            if (authenticated) {
                const userData = authService.getUserFromToken();
                if (userData) {
                    setUser(userData);
                } else {
                    setIsAuthenticated(false);
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            setIsAuthenticated(true);
            const userData = authService.getUserFromToken();
            setUser(userData);
            
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
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
            user, 
            login, 
            logout, 
            register, }}>
        {children}
        </AuthContext.Provider>
    );
};


