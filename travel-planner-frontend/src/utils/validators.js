export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  return null;
};

export const validateDestination = (destination) => {
  if (!destination) return 'Destination is required';
  if (destination.length < 2) return 'Destination must be at least 2 characters';
  return null;
};

export const validateDateRange = (startDate, endDate) => {
  if (!startDate) return 'Start date is required';
  if (!endDate) return 'End date is required';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (start < today) return 'Start date cannot be in the past';
  if (end <= start) return 'End date must be after start date';
  
  return null;
};

export const validateTripData = (tripData) => {
  const errors = {};
  
  const destinationError = validateDestination(tripData.destination);
  if (destinationError) errors.destination = destinationError;
  
  const dateError = validateDateRange(tripData.dateRange?.startDate, tripData.dateRange?.endDate);
  if (dateError) errors.dateRange = dateError;
  
  if (!tripData.budget) errors.budget = 'Budget is required';
  if (!tripData.numberOfTravelers || tripData.numberOfTravelers < 1) {
    errors.numberOfTravelers = 'Number of travelers must be at least 1';
  }
  
  return Object.keys(errors).length > 0 ? errors : null;
};
