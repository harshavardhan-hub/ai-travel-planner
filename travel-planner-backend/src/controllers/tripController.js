import Trip from '../models/Trip.js';
import User from '../models/User.js';
import { generateItinerary } from '../services/aiService.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { logger } from '../utils/logger.js';

export const createTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const tripData = req.body;

    const startDate = new Date(tripData.dateRange.startDate);
    const endDate = new Date(tripData.dateRange.endDate);
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const trip = await Trip.create({
      userId,
      ...tripData,
      duration,
      status: 'draft',
    });

    await User.findByIdAndUpdate(userId, {
      $push: { createdTrips: trip._id },
    });

    logger.success(`Trip created: ${trip._id}`);
    
    // ✅ Log the created trip data
    logger.debug('Created trip data:', {
      destination: trip.destination,
      budget: trip.budget,
      travelers: trip.numberOfTravelers,
      preferences: trip.preferences,
      constraints: trip.constraints,
    });

    return successResponse(res, { trip }, 'Trip created successfully', 201);
  } catch (error) {
    logger.error('Create trip error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const generateAIItinerary = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return errorResponse(res, 'Trip not found', 404);
    }

    if (trip.userId.toString() !== req.user.id) {
      return errorResponse(res, 'Not authorized to access this trip', 403);
    }

    logger.info(`Generating itinerary for trip: ${tripId}`);
    
    // ✅ Log what we're sending to AI
    logger.debug('Trip data being sent to AI:', {
      destination: trip.destination,
      duration: trip.duration,
      budget: trip.budget,
      numberOfTravelers: trip.numberOfTravelers,
      travelStyle: trip.preferences?.travelStyle,
      pace: trip.preferences?.pace,
      activities: trip.preferences?.activities,
      foodPreferences: trip.preferences?.foodPreferences,
      mustVisit: trip.constraints?.mustVisit,
      avoid: trip.constraints?.avoid,
      specialNotes: trip.constraints?.specialNotes,
    });

    // ✅ Pass the entire trip object to AI service
    const aiPlan = await generateItinerary({
      destination: trip.destination,
      dateRange: trip.dateRange,
      duration: trip.duration,
      budget: trip.budget,
      numberOfTravelers: trip.numberOfTravelers,
      preferences: trip.preferences,
      constraints: trip.constraints,
    });

    trip.aiPlan = aiPlan;
    trip.status = 'generated';
    trip.generatedAt = new Date();
    await trip.save();

    logger.success(`Itinerary generated for trip: ${tripId}`);

    return successResponse(res, { trip }, 'Itinerary generated successfully');
  } catch (error) {
    logger.error('Generate itinerary error:', error);
    return errorResponse(res, error.message || 'Failed to generate itinerary', 500);
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const userId = req.user.id;

    const query = { userId };
    if (status) query.status = status;
    if (search) {
      query.destination = { $regex: search, $options: 'i' };
    }

    const total = await Trip.countDocuments(query);
    const trips = await Trip.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return paginatedResponse(res, trips, page, limit, total, 'Trips retrieved successfully');
  } catch (error) {
    logger.error('Get trips error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const getTripById = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return errorResponse(res, 'Trip not found', 404);
    }

    if (trip.userId.toString() !== req.user.id) {
      return errorResponse(res, 'Not authorized to access this trip', 403);
    }

    return successResponse(res, { trip }, 'Trip retrieved successfully');
  } catch (error) {
    logger.error('Get trip error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const updates = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return errorResponse(res, 'Trip not found', 404);
    }

    if (trip.userId.toString() !== req.user.id) {
      return errorResponse(res, 'Not authorized to update this trip', 403);
    }

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        trip[key] = updates[key];
      }
    });

    await trip.save();

    logger.success(`Trip updated: ${tripId}`);

    return successResponse(res, { trip }, 'Trip updated successfully');
  } catch (error) {
    logger.error('Update trip error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return errorResponse(res, 'Trip not found', 404);
    }

    if (trip.userId.toString() !== req.user.id) {
      return errorResponse(res, 'Not authorized to delete this trip', 403);
    }

    await trip.deleteOne();

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { createdTrips: tripId },
    });

    logger.success(`Trip deleted: ${tripId}`);

    return successResponse(res, null, 'Trip deleted successfully');
  } catch (error) {
    logger.error('Delete trip error:', error);
    return errorResponse(res, error.message, 500);
  }
};
