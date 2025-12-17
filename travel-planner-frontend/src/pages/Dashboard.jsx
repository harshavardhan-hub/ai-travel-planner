import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { tripService } from '@services/tripService';
import Navbar from '@components/common/Navbar';
import Sidebar from '@components/common/Sidebar';
import Footer from '@components/common/Footer';
import DashboardHeader from '@components/dashboard/DashboardHeader';
import StatsCard from '@components/dashboard/StatsCard';
import RecentTrips from '@components/dashboard/RecentTrips';
import { 
  MapIcon, 
  CheckCircleIcon, 
  BookmarkIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, tripsResponse] = await Promise.all([
        tripService.getUserStats(),
        tripService.getAllTrips({ limit: 6, page: 1 }),
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.data.stats);
      }

      if (tripsResponse.success) {
        setRecentTrips(tripsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            <DashboardHeader />

            {/* Stats Grid - More Compact */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatsCard
                title="Total Trips"
                value={stats?.totalTrips || 0}
                icon={MapIcon}
                color="primary"
              />
              <StatsCard
                title="Saved Trips"
                value={stats?.savedTrips || 0}
                icon={BookmarkIcon}
                color="green"
              />
              <StatsCard
                title="Completed"
                value={stats?.completedTrips || 0}
                icon={CheckCircleIcon}
                color="purple"
              />
              <StatsCard
                title="In Progress"
                value={(stats?.totalTrips || 0) - (stats?.completedTrips || 0)}
                icon={ClockIcon}
                color="orange"
              />
            </div>

            {/* Recent Trips */}
            <div>
              <h2 className="text-lg font-bold text-dark-900 mb-4">Recent Trips</h2>
              <RecentTrips trips={recentTrips} loading={loading} />
            </div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
