import api from './axiosConfig';

const eventsService = {
    getAll: async () => {
        const response = await api.get('/events/');
        return response.data
    },

    getById: async (id) => {
        const response = await api.get(`/events/${id}/`);
        return response.data;
    },

    create: async (formData) => {
        const response = await api.post('/events/', formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    update: async (id, formData) => {
        const response = await api.put(`/events/${id}/`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/events/${id}/`);
        return response.data;
    },
};

export default eventsService;