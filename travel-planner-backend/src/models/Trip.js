import mongoose from 'mongoose';

const activityBlockSchema = new mongoose.Schema({
  time: String,
  activity: String,
  location: String,
  duration: String,
  estimatedCost: String,
  notes: String,
});

const dayPlanSchema = new mongoose.Schema({
  day: Number,
  date: String,
  title: String,
  morning: activityBlockSchema,
  afternoon: activityBlockSchema,
  evening: activityBlockSchema,
  meals: {
    breakfast: String,
    lunch: String,
    dinner: String,
  },
  accommodation: String,
  transportation: String,
  dailyBudget: String,
  userNotes: String,
});

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: String,
      required: [true, 'Please provide a destination'],
      trim: true,
    },
    dateRange: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    budget: {
      type: String,
      enum: ['budget', 'moderate', 'luxury'],
      required: true,
    },
    numberOfTravelers: {
      type: Number,
      default: 1,
      min: 1,
    },
    preferences: {
      travelStyle: {
        type: String,
        enum: ['relaxed', 'balanced', 'adventure'],
        default: 'balanced',
      },
      foodPreferences: {
        type: [String],
        default: [],
      },
      activities: {
        type: [String],
        default: [],
      },
      pace: {
        type: String,
        enum: ['slow', 'moderate', 'packed'],
        default: 'moderate',
      },
    },
    constraints: {
      mustVisit: {
        type: [String],
        default: [],
      },
      avoid: {
        type: [String],
        default: [],
      },
      specialNotes: String,
    },
    aiPlan: {
      overview: String,
      days: [dayPlanSchema],
      totalEstimatedBudget: String,
      tips: [String],
      accommodation: String,
      transportation: String,
    },
    status: {
      type: String,
      enum: ['draft', 'generated', 'saved', 'completed'],
      default: 'draft',
    },
    generatedAt: Date,
  },
  {
    timestamps: true,
  }
);

tripSchema.index({ userId: 1, createdAt: -1 });
tripSchema.index({ destination: 1 });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
