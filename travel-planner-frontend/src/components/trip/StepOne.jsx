import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline';
import { BUDGET_OPTIONS } from '@utils/constants';
import { validateDestination, validateDateRange } from '@utils/validators';

const StepOne = ({ data, onNext, isFirstStep }) => {
  const [formData, setFormData] = useState({
    destination: data.destination || '',
    dateRange: data.dateRange || { startDate: '', endDate: '' },
    budget: data.budget || 'moderate',
    numberOfTravelers: data.numberOfTravelers || 1,
  });
  const [errors, setErrors] = useState({});

  const [startDate, setStartDate] = useState(
    formData.dateRange.startDate ? new Date(formData.dateRange.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    formData.dateRange.endDate ? new Date(formData.dateRange.endDate) : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFormData((prev) => ({
      ...prev,
      dateRange: { 
        ...prev.dateRange, 
        startDate: date ? date.toISOString().split('T')[0] : '' 
      },
    }));
    if (errors.dateRange) {
      setErrors((prev) => ({ ...prev, dateRange: null }));
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFormData((prev) => ({
      ...prev,
      dateRange: { 
        ...prev.dateRange, 
        endDate: date ? date.toISOString().split('T')[0] : '' 
      },
    }));
    if (errors.dateRange) {
      setErrors((prev) => ({ ...prev, dateRange: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const destError = validateDestination(formData.destination);
    const dateError = validateDateRange(formData.dateRange.startDate, formData.dateRange.endDate);

    if (destError || dateError) {
      setErrors({
        destination: destError,
        dateRange: dateError,
      });
      return;
    }

    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-dark-900 mb-4">Basic Trip Information</h2>

      <div className="space-y-4">
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <MapPinIcon className="h-4 w-4 inline mr-1 text-gray-400" />
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className={`input-field text-sm ${errors.destination ? 'border-red-500' : ''}`}
            placeholder="e.g., Paris, France"
          />
          {errors.destination && (
            <p className="mt-1 text-xs text-red-600">{errors.destination}</p>
          )}
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <CalendarIcon className="h-4 w-4 inline mr-1 text-gray-400" />
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="MMM dd, yyyy"
              className={`input-field text-sm w-full ${errors.dateRange ? 'border-red-500' : ''}`}
              placeholderText="Select start date"
              calendarStartDay={0}
              formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              dateFormat="MMM dd, yyyy"
              className={`input-field text-sm w-full ${errors.dateRange ? 'border-red-500' : ''}`}
              placeholderText="Select end date"
              calendarStartDay={0}
              formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
            />
          </div>
          {errors.dateRange && (
            <p className="col-span-2 text-xs text-red-600">{errors.dateRange}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CurrencyDollarIcon className="h-4 w-4 inline mr-1 text-gray-400" />
            Budget
          </label>
          <div className="grid grid-cols-3 gap-2">
            {BUDGET_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange({ target: { name: 'budget', value: option.value } })}
                className={`p-3 border-2 rounded-lg transition-all text-sm ${
                  formData.budget === option.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl mb-1">{option.icon}</div>
                <div className="font-semibold text-dark-900 text-xs">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Number of Travelers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <UsersIcon className="h-4 w-4 inline mr-1 text-gray-400" />
            Number of Travelers
          </label>
          <input
            type="number"
            name="numberOfTravelers"
            value={formData.numberOfTravelers}
            onChange={handleChange}
            className="input-field text-sm"
            min="1"
            max="20"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="btn-primary text-sm">
          Next Step →
        </button>
      </div>
    </form>
  );
};

export default StepOne;
