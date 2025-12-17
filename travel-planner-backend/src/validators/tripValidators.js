import { body } from 'express-validator';

export const createTripValidation = [
  body('destination')
    .trim()
    .notEmpty()
    .withMessage('Destination is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Destination must be between 2 and 100 characters'),
  body('dateRange.startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Invalid start date format'),
  body('dateRange.endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('Invalid end date format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.dateRange.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('budget')
    .notEmpty()
    .withMessage('Budget is required')
    .isIn(['budget', 'moderate', 'luxury'])
    .withMessage('Budget must be budget, moderate, or luxury'),
  body('numberOfTravelers')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of travelers must be between 1 and 20'),
  body('preferences.travelStyle')
    .optional()
    .isIn(['relaxed', 'balanced', 'adventure'])
    .withMessage('Travel style must be relaxed, balanced, or adventure'),
  body('preferences.pace')
    .optional()
    .isIn(['slow', 'moderate', 'packed'])
    .withMessage('Pace must be slow, moderate, or packed'),
];

export const updateTripValidation = [
  body('aiPlan.days.*.userNotes')
    .optional()
    .isString()
    .withMessage('User notes must be a string'),
  body('status')
    .optional()
    .isIn(['draft', 'generated', 'saved', 'completed'])
    .withMessage('Invalid status'),
];
