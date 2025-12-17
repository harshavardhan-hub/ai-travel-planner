import { useState } from 'react';
import DayCard from '@components/itinerary/DayCard';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ItineraryView = ({ trip, onUpdate, onRegenerate, loading }) => {
  const [expandedDays, setExpandedDays] = useState([]); // ✅ Changed from [0] to [] - all collapsed by default

  const toggleDay = (index) => {
    setExpandedDays((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setExpandedDays(trip.aiPlan.days.map((_, i) => i));
  };

  const collapseAll = () => {
    setExpandedDays([]);
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
        <div>
          <h2 className="text-base font-semibold text-dark-900">Your Itinerary</h2>
          <p className="text-xs text-gray-600">{trip.duration} days in {trip.destination}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={expandedDays.length === 0 ? expandAll : collapseAll}
            className="btn-ghost text-xs"
          >
            {expandedDays.length === 0 ? 'Expand All' : 'Collapse All'}
          </button>
          <button
            onClick={onRegenerate}
            disabled={loading}
            className="btn-secondary text-xs"
          >
            <ArrowPathIcon className={`h-3.5 w-3.5 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        </div>
      </div>

      {/* Overview */}
      {trip.aiPlan.overview && (
        <div className="card">
          <h3 className="text-sm font-semibold text-dark-900 mb-2">Trip Overview</h3>
          <p className="text-sm text-gray-700">{trip.aiPlan.overview}</p>
        </div>
      )}

      {/* Day Cards */}
      <div className="space-y-3">
        {trip.aiPlan.days.map((day, index) => (
          <DayCard
            key={index}
            day={day}
            index={index}
            isExpanded={expandedDays.includes(index)}
            onToggle={() => toggleDay(index)}
            onUpdate={(updatedDay) => onUpdate(index, updatedDay)}
          />
        ))}
      </div>

      {/* Tips Section */}
      {trip.aiPlan.tips && trip.aiPlan.tips.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-semibold text-dark-900 mb-3">💡 Travel Tips</h3>
          <ul className="space-y-1.5">
            {trip.aiPlan.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-xs">
                <span className="text-primary-600 mr-2">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Budget & Logistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip.aiPlan.totalEstimatedBudget && (
          <div className="card">
            <h3 className="text-sm font-semibold text-dark-900 mb-1">💰 Estimated Budget</h3>
            <p className="text-xl font-bold text-primary-600">{trip.aiPlan.totalEstimatedBudget}</p>
          </div>
        )}
        {trip.aiPlan.accommodation && (
          <div className="card">
            <h3 className="text-sm font-semibold text-dark-900 mb-1">🏨 Accommodation</h3>
            <p className="text-xs text-gray-700">{trip.aiPlan.accommodation}</p>
          </div>
        )}
      </div>

      {trip.aiPlan.transportation && (
        <div className="card">
          <h3 className="text-sm font-semibold text-dark-900 mb-1">🚗 Transportation</h3>
          <p className="text-xs text-gray-700">{trip.aiPlan.transportation}</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryView;
