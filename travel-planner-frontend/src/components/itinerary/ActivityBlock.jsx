import { ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const ActivityBlock = ({ title, icon, activity }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <h4 className="font-semibold text-dark-900 text-sm">{title}</h4>
      </div>

      <div className="space-y-2">
        <div>
          <h5 className="font-semibold text-dark-900 text-sm">{activity.activity}</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {activity.time && (
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>{activity.time}</span>
            </div>
          )}
          {activity.location && (
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>{activity.location}</span>
            </div>
          )}
          {activity.duration && (
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>Duration: {activity.duration}</span>
            </div>
          )}
          {activity.estimatedCost && (
            <div className="flex items-center text-gray-600">
              <CurrencyDollarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>{activity.estimatedCost}</span>
            </div>
          )}
        </div>

        {activity.notes && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-medium">💡 Tip:</span> {activity.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityBlock;
