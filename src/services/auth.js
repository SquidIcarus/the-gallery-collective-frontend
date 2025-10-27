import api from './axiosConfig';
import { jwtDecode } from 'jwt-decode';

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

    getUserFromToken: () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem('token');
                return null;
            }

            return decoded;
        } catch (error) {
            console.error('Token decode error:', error);
            return null;
        }
    },
};
    // getIsArtist: () => {
    //     return localStorage.getItem('is_artist') === 'true';
    // },

    // getUserId: () => {
    //     return localStorage.getItem('user_id');
    // }
// };

export default authService;