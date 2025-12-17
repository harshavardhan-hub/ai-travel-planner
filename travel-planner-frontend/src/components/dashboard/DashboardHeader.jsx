import { Link } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@hooks/useAuth';

const DashboardHeader = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-primary-100">
            Ready to plan your next adventure?
          </p>
        </div>
        <Link
          to="/create-trip"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-md text-sm whitespace-nowrap"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Create New Trip
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
