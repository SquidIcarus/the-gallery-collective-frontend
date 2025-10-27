import api from './axiosConfig';

const artworksService = {
    getAll: async () => {
        const response = await api.get('/artworks/')
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/artworks/${id}/`);
        return response.data;
    },

    create: async (formData) => {
        const response = await api.post('/artworks/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    update: async (id, formData) => {
        const response = await api.put(`/artworks/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/artworks/${id}/`);
        return response.data;
    }
};

export default artworksService;