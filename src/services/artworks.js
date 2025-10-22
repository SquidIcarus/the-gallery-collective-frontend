import api from './axiosConfig';

const artworksService = {
    getAll: async () => {
        const response = await api.get('/artworks/')
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get('/artworks/${id}/');
        return response.data;
    },
};

export default artworksService;