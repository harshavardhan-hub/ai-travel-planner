import { useState } from 'react';
import { TRAVEL_STYLES, PACE_OPTIONS, ACTIVITY_OPTIONS, FOOD_PREFERENCES } from '@utils/constants';

const StepTwo = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    preferences: data.preferences || {
      travelStyle: 'balanced',
      foodPreferences: [],
      activities: [],
      pace: 'moderate',
    },
  });

  const handleStyleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, travelStyle: value },
    }));
  };

  const handlePaceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, pace: value },
    }));
  };

  const toggleActivity = (value) => {
    setFormData((prev) => {
      const activities = prev.preferences.activities.includes(value)
        ? prev.preferences.activities.filter((a) => a !== value)
        : [...prev.preferences.activities, value];
      return {
        ...prev,
        preferences: { ...prev.preferences, activities },
      };
    });
  };

  const toggleFoodPref = (value) => {
    setFormData((prev) => {
      const foodPreferences = prev.preferences.foodPreferences.includes(value)
        ? prev.preferences.foodPreferences.filter((f) => f !== value)
        : [...prev.preferences.foodPreferences, value];
      return {
        ...prev,
        preferences: { ...prev.preferences, foodPreferences },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-dark-900 mb-4">Travel Preferences</h2>

      <div className="space-y-5">
        {/* Travel Style - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
          <div className="grid grid-cols-3 gap-2">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => handleStyleChange(style.value)}
                className={`p-3 border-2 rounded-lg transition-all ${
                  formData.preferences.travelStyle === style.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl mb-1">{style.icon}</div>
                <div className="font-semibold text-dark-900 text-xs">{style.label}</div>
                <div className="text-[10px] text-gray-600 leading-tight">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pace - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Pace</label>
          <div className="grid grid-cols-3 gap-2">
            {PACE_OPTIONS.map((pace) => (
              <button
                key={pace.value}
                type="button"
                onClick={() => handlePaceChange(pace.value)}
                className={`p-3 border-2 rounded-lg transition-all ${
                  formData.preferences.pace === pace.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-dark-900 text-xs">{pace.label}</div>
                <div className="text-[10px] text-gray-600">{pace.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Activities - Compact Grid */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Activities <span className="text-gray-500 text-xs">(Select multiple)</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {ACTIVITY_OPTIONS.map((activity) => (
              <button
                key={activity.value}
                type="button"
                onClick={() => toggleActivity(activity.value)}
                className={`p-2.5 border-2 rounded-lg transition-all ${
                  formData.preferences.activities.includes(activity.value)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-0.5">{activity.icon}</div>
                <div className="font-medium text-dark-900 text-[10px] leading-tight">{activity.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Food Preferences - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Preferences <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {FOOD_PREFERENCES.map((food) => (
              <button
                key={food.value}
                type="button"
                onClick={() => toggleFoodPref(food.value)}
                className={`p-2.5 border-2 rounded-lg transition-all ${
                  formData.preferences.foodPreferences.includes(food.value)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-0.5">{food.icon}</div>
                <div className="font-medium text-dark-900 text-[10px] leading-tight">{food.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack} className="btn-secondary text-sm">
          ← Back
        </button>
        <button type="submit" className="btn-primary text-sm">
          Next Step →
        </button>
      </div>
    </form>
  );
};

export default StepTwo;
