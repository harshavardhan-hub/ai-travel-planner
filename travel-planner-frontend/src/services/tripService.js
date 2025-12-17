import api from './api';

export const tripService = {
  createTrip: async (tripData) => {
    const response = await api.post('/trips', tripData);
    return response.data;
  },

  generateItinerary: async (tripId) => {
    const response = await api.post(`/trips/${tripId}/generate`);
    return response.data;
  },

  getAllTrips: async (params = {}) => {
    const response = await api.get('/trips', { params });
    return response.data;
  },

  getTripById: async (tripId) => {
    const response = await api.get(`/trips/${tripId}`);
    return response.data;
  },

  updateTrip: async (tripId, updates) => {
    const response = await api.put(`/trips/${tripId}`, updates);
    return response.data;
  },

  deleteTrip: async (tripId) => {
    const response = await api.delete(`/trips/${tripId}`);
    return response.data;
  },

  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },
};

export default tripService;
