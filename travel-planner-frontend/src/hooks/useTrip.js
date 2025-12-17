import { useState } from 'react';
import { tripService } from '@services/tripService';
import toast from 'react-hot-toast';

export const useTrip = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTrip = async (tripData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tripService.createTrip(tripData);
      return response.data.trip;
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create trip';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateItinerary = async (tripId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tripService.generateItinerary(tripId);
      toast.success('Itinerary generated successfully!');
      return response.data.trip;
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to generate itinerary';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (tripId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tripService.updateTrip(tripId, updates);
      toast.success('Trip updated successfully!');
      return response.data.trip;
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update trip';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (tripId) => {
    setLoading(true);
    setError(null);
    try {
      await tripService.deleteTrip(tripId);
      toast.success('Trip deleted successfully!');
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to delete trip';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTrip,
    generateItinerary,
    updateTrip,
    deleteTrip,
  };
};

export default useTrip;
