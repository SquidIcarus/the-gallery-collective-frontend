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
};

export default eventsService;