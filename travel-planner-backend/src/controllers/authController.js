import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { logger } from '../utils/logger.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    const user = await User.create({
      name,
      email,
      passwordHash: password,
    });

    const token = generateToken(user._id);

    logger.success(`New user registered: ${email}`);

    return successResponse(
      res,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          preferences: user.preferences,
        },
      },
      'User registered successfully',
      201
    );
  } catch (error) {
    logger.error('Signup error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const token = generateToken(user._id);

    logger.success(`User logged in: ${email}`);

    return successResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
      },
    }, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    return errorResponse(res, error.message, 500);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'createdTrips',
      options: { sort: { createdAt: -1 }, limit: 5 },
    });

    return successResponse(res, { user }, 'User data retrieved');
  } catch (error) {
    logger.error('Get user error:', error);
    return errorResponse(res, error.message, 500);
  }
};
