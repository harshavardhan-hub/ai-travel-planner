import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import ActivityBlock from './ActivityBlock';
import EditableNotes from './EditableNotes';
import { motion, AnimatePresence } from 'framer-motion';

const DayCard = ({ day, index, isExpanded, onToggle, onUpdate }) => {
  const handleNotesUpdate = (notes) => {
    onUpdate({ ...day, userNotes: notes });
  };

  return (
    <div className="card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h3 className="text-base font-bold text-dark-900">
            Day {day.day} {day.title && `- ${day.title}`}
          </h3>
          {day.date && (
            <p className="text-xs text-gray-600 mt-0.5">{day.date}</p>
          )}
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {day.morning && (
                <ActivityBlock title="Morning" icon="🌅" activity={day.morning} />
              )}

              {day.afternoon && (
                <ActivityBlock title="Afternoon" icon="☀️" activity={day.afternoon} />
              )}

              {day.evening && (
                <ActivityBlock title="Evening" icon="🌆" activity={day.evening} />
              )}

              {day.meals && (
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="font-semibold text-dark-900 mb-2 text-sm">🍽️ Meals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {day.meals.breakfast && (
                      <div>
                        <span className="font-medium text-gray-700">Breakfast:</span>
                        <p className="text-gray-600">{day.meals.breakfast}</p>
                      </div>
                    )}
                    {day.meals.lunch && (
                      <div>
                        <span className="font-medium text-gray-700">Lunch:</span>
                        <p className="text-gray-600">{day.meals.lunch}</p>
                      </div>
                    )}
                    {day.meals.dinner && (
                      <div>
                        <span className="font-medium text-gray-700">Dinner:</span>
                        <p className="text-gray-600">{day.meals.dinner}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(day.accommodation || day.transportation) && (
                <div className="pt-3 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {day.accommodation && (
                    <div>
                      <span className="font-medium text-gray-700">🏨 Accommodation:</span>
                      <p className="text-gray-600 mt-0.5">{day.accommodation}</p>
                    </div>
                  )}
                  {day.transportation && (
                    <div>
                      <span className="font-medium text-gray-700">🚗 Transportation:</span>
                      <p className="text-gray-600 mt-0.5">{day.transportation}</p>
                    </div>
                  )}
                </div>
              )}

              {day.dailyBudget && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="font-medium text-gray-700 text-xs">💰 Daily Budget:</span>
                  <p className="text-base font-semibold text-primary-600 mt-0.5">
                    {day.dailyBudget}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <EditableNotes
                  notes={day.userNotes || ''}
                  onSave={handleNotesUpdate}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DayCard;
