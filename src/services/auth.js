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
            localStorage.setItem('user_id', response.data.user_id);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_artist');
        localStorage.removeItem('user_id');
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

    getUserId: () => {
        return localStorage.getItem('user_id');
    }
};

export default authService;