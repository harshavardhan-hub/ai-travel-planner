import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { signupValidation, loginValidation } from '../validators/authValidators.js';
import { validate } from '../middlewares/validator.js';
import { protect } from '../middlewares/auth.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/signup', authLimiter, signupValidation, validate, signup);
router.post('/login', authLimiter, loginValidation, validate, login);
router.get('/me', protect, getMe);

export default router;
