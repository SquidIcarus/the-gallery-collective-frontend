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
            localStorage.setItem('is_artist', response.data.is_artist);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_artist');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getIsArtist: () => {
        return localStorage.getItem('is_artist') === 'true';
    },
};

export default authService;