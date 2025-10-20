import api from './axiosConfig';

const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register/', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login/', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },
};

export default authService;