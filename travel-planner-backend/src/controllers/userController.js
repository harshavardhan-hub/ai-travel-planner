import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { logger } from '../utils/logger.js';

export const updatePreferences = async (req, res) => {
  try {
    const { travelStyle, defaultBudget } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    if (travelStyle) user.preferences.travelStyle = travelStyle;
    if (defaultBudget) user.preferences.defaultBudget = defaultBudget;

    await user.save();

    logger.success(`User preferences updated: ${user.email}`);

    return successResponse(res, { user }, 'Preferences updated successfully');
  } catch (error) {
    logger.error('Update preferences error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('createdTrips');

    const stats = {
      totalTrips: user.createdTrips.length,
      savedTrips: user.createdTrips.filter((t) => t.status === 'saved').length,
      completedTrips: user.createdTrips.filter((t) => t.status === 'completed').length,
    };

    return successResponse(res, { stats }, 'User stats retrieved');
  } catch (error) {
    logger.error('Get user stats error:', error);
    return errorResponse(res, error.message, 500);
  }
};
