import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 'Not authorized to access this route', 401);
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = await User.findById(decoded.id).select('-passwordHash');

      if (!req.user) {
        return errorResponse(res, 'User not found', 404);
      }

      next();
    } catch (error) {
      return errorResponse(res, 'Not authorized, token failed', 401);
    }
  } catch (error) {
    return errorResponse(res, 'Authentication error', 500);
  }
};

export default protect;
