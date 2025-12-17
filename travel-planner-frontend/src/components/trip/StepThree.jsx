import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const StepThree = ({ data, onBack, onComplete, loading }) => {
  const [formData, setFormData] = useState({
    constraints: data.constraints || {
      mustVisit: [],
      avoid: [],
      specialNotes: '',
    },
  });

  const [mustVisitInput, setMustVisitInput] = useState('');
  const [avoidInput, setAvoidInput] = useState('');

  const addMustVisit = () => {
    if (mustVisitInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        constraints: {
          ...prev.constraints,
          mustVisit: [...prev.constraints.mustVisit, mustVisitInput.trim()],
        },
      }));
      setMustVisitInput('');
    }
  };

  const removeMustVisit = (index) => {
    setFormData((prev) => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        mustVisit: prev.constraints.mustVisit.filter((_, i) => i !== index),
      },
    }));
  };

  const addAvoid = () => {
    if (avoidInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        constraints: {
          ...prev.constraints,
          avoid: [...prev.constraints.avoid, avoidInput.trim()],
        },
      }));
      setAvoidInput('');
    }
  };

  const removeAvoid = (index) => {
    setFormData((prev) => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        avoid: prev.constraints.avoid.filter((_, i) => i !== index),
      },
    }));
  };

  const handleNotesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        specialNotes: e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-dark-900 mb-4">Constraints & Special Requests</h2>

      <div className="space-y-4">
        {/* Must Visit - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Must-Visit Places <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={mustVisitInput}
              onChange={(e) => setMustVisitInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMustVisit())}
              className="input-field flex-1 text-sm"
              placeholder="e.g., Eiffel Tower"
            />
            <button
              type="button"
              onClick={addMustVisit}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          {formData.constraints.mustVisit.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {formData.constraints.mustVisit.map((place, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs"
                >
                  {place}
                  <button
                    type="button"
                    onClick={() => removeMustVisit(index)}
                    className="ml-1.5 hover:text-primary-900"
                  >
                    <XMarkIcon className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Places to Avoid - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Places to Avoid <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={avoidInput}
              onChange={(e) => setAvoidInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAvoid())}
              className="input-field flex-1 text-sm"
              placeholder="e.g., Crowded tourist traps"
            />
            <button
              type="button"
              onClick={addAvoid}
              className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          {formData.constraints.avoid.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {formData.constraints.avoid.map((place, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs"
                >
                  {place}
                  <button
                    type="button"
                    onClick={() => removeAvoid(index)}
                    className="ml-1.5 hover:text-red-900"
                  >
                    <XMarkIcon className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Special Notes - Compact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Special Notes <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <textarea
            value={formData.constraints.specialNotes}
            onChange={handleNotesChange}
            rows="3"
            className="input-field resize-none text-sm"
            placeholder="Any special requirements, accessibility needs, or additional information..."
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack} className="btn-secondary text-sm" disabled={loading}>
          ← Back
        </button>
        <button type="submit" className="btn-primary text-sm" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Itinerary ✨'}
        </button>
      </div>
    </form>
  );
};

export default StepThree;
