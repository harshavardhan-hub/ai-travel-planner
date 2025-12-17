export const TRAVEL_STYLES = [
  { value: 'relaxed', label: 'Relaxed', icon: '🌴', description: 'Slow pace, more rest time' },
  { value: 'balanced', label: 'Balanced', icon: '⚖️', description: 'Mix of activities and relaxation' },
  { value: 'adventure', label: 'Adventure', icon: '🏔️', description: 'Action-packed, thrilling experiences' },
];

export const BUDGET_OPTIONS = [
  { value: 'budget', label: 'Budget', icon: '💰', description: 'Cost-effective options' },
  { value: 'moderate', label: 'Moderate', icon: '💵', description: 'Comfortable mid-range' },
  { value: 'luxury', label: 'Luxury', icon: '💎', description: 'Premium experiences' },
];

export const PACE_OPTIONS = [
  { value: 'slow', label: 'Slow', description: '1-2 activities per day' },
  { value: 'moderate', label: 'Moderate', description: '3-4 activities per day' },
  { value: 'packed', label: 'Packed', description: '5+ activities per day' },
];

export const ACTIVITY_OPTIONS = [
  { value: 'nature', label: 'Nature & Outdoors', icon: '🌲' },
  { value: 'culture', label: 'Culture & History', icon: '🏛️' },
  { value: 'food', label: 'Food & Dining', icon: '🍽️' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { value: 'adventure', label: 'Adventure Sports', icon: '🏄' },
  { value: 'relaxation', label: 'Spa & Wellness', icon: '💆' },
  { value: 'photography', label: 'Photography', icon: '📸' },
];

export const FOOD_PREFERENCES = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'halal', label: 'Halal', icon: '🕌' },
  { value: 'kosher', label: 'Kosher', icon: '✡️' },
  { value: 'gluten_free', label: 'Gluten-Free', icon: '🌾' },
  { value: 'local', label: 'Local Cuisine', icon: '🍜' },
  { value: 'international', label: 'International', icon: '🌍' },
];

export const TRIP_STATUS = {
  DRAFT: 'draft',
  GENERATED: 'generated',
  SAVED: 'saved',
  COMPLETED: 'completed',
};

export const STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-700',
  generated: 'bg-blue-100 text-blue-700',
  saved: 'bg-green-100 text-green-700',
  completed: 'bg-purple-100 text-purple-700',
};

export const STATUS_LABELS = {
  draft: 'Draft',
  generated: 'Generated',
  saved: 'Saved',
  completed: 'Completed',
};

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Travel Planner';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const LOGO_URL = 'https://res.cloudinary.com/drit9nkha/image/upload/v1765941772/TP_LOGO_xiaun4.png';
