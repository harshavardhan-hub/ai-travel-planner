import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  TrashIcon 
} from '@heroicons/react/24/outline';
import { formatDate, capitalizeFirst } from '@utils/helpers';
import { STATUS_COLORS, STATUS_LABELS } from '@utils/constants';
import { motion } from 'framer-motion';

const TripCard = ({ trip, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      onDelete(trip._id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/trip/${trip._id}`}
        className="card hover:shadow-lg transition-all group block"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-dark-900 group-hover:text-primary-600 transition-colors">
                {trip.destination}
              </h3>
              <span className={`badge ${STATUS_COLORS[trip.status]}`}>
                {STATUS_LABELS[trip.status]}
              </span>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">
              {formatDate(trip.dateRange.startDate, 'MMM dd')} - {formatDate(trip.dateRange.endDate, 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
            {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
            {capitalizeFirst(trip.budget)} budget
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
            {trip.numberOfTravelers} {trip.numberOfTravelers === 1 ? 'traveler' : 'travelers'}
          </div>
        </div>

        {trip.aiPlan?.overview && (
          <p className="mt-4 text-sm text-gray-600 line-clamp-2">
            {trip.aiPlan.overview}
          </p>
        )}
      </Link>
    </motion.div>
  );
};

export default TripCard;
