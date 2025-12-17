import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@utils/helpers';
import { STATUS_COLORS, STATUS_LABELS } from '@utils/constants';
import EmptyState from '@components/common/EmptyState';

const RecentTrips = ({ trips, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!trips || trips.length === 0) {
    return (
      <EmptyState
        icon={MapPinIcon}
        title="No trips yet"
        description="Start planning your first adventure by creating a new trip."
        actionText="Create Trip"
        actionLink="/create-trip"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trips.map((trip) => (
        <Link
          key={trip._id}
          to={`/trip/${trip._id}`}
          className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg hover:border-primary-200 transition-all group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-dark-900 group-hover:text-primary-600 transition-colors truncate">
                {trip.destination}
              </h3>
            </div>
            <span className={`badge text-xs ml-2 ${STATUS_COLORS[trip.status]}`}>
              {STATUS_LABELS[trip.status]}
            </span>
          </div>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span className="truncate">
                {formatDate(trip.dateRange.startDate, 'MMM dd')} - {formatDate(trip.dateRange.endDate, 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <span>{trip.duration} {trip.duration === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <span>{trip.numberOfTravelers} {trip.numberOfTravelers === 1 ? 'traveler' : 'travelers'}</span>
              </div>
            </div>
          </div>

          {trip.aiPlan?.overview && (
            <p className="mt-3 text-xs text-gray-600 line-clamp-2">
              {trip.aiPlan.overview}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
};

export default RecentTrips;
