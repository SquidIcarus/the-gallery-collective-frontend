import api from './axiosConfig';

const artistsService = {
    getAll: async () => {
        const response = await api.get('/artists/');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/artists/${id}/`);
        return response.data;
    },

    getArtworks: async (userId) => {
        const response = await api.get(`/artists/${userId}/artworks/`);
        return response.data;
    },

    getEvents: async (userId) => {
        const response = await api.get(`/artists/${userId}/events/`);
        return response.data;
    },
};

export default artistsService;
