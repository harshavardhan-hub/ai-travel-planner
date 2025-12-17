import express from 'express';
import {
  createTrip,
  generateAIItinerary,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController.js';
import { createTripValidation, updateTripValidation } from '../validators/tripValidators.js';
import { validate } from '../middlewares/validator.js';
import { protect } from '../middlewares/auth.js';
import { aiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/', protect, createTripValidation, validate, createTrip);
router.post('/:tripId/generate', protect, aiLimiter, generateAIItinerary);
router.get('/', protect, getAllTrips);
router.get('/:tripId', protect, getTripById);
router.put('/:tripId', protect, updateTripValidation, validate, updateTrip);
router.delete('/:tripId', protect, deleteTrip);

export default router;
