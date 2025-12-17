import express from 'express';
import { updatePreferences, getUserStats } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.put('/preferences', protect, updatePreferences);
router.get('/stats', protect, getUserStats);

export default router;
