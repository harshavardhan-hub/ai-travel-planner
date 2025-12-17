import { useState, useEffect } from 'react';
import { tripService } from '@services/tripService';
import { useTrip } from '@hooks/useTrip';
import Navbar from '@components/common/Navbar';
import Sidebar from '@components/common/Sidebar';
import Footer from '@components/common/Footer';
import TripCard from '@components/trip/TripCard';
import EmptyState from '@components/common/EmptyState';
import Loader from '@components/common/Loader';
import { MapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { debounce } from '@utils/helpers';

const MyTrips = () => {
  const { deleteTrip } = useTrip();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    loadTrips();
  }, [searchQuery, statusFilter, pagination.page]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const response = await tripService.getAllTrips({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery,
        status: statusFilter,
      });

      if (response.success) {
        setTrips(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, 500);

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
      loadTrips();
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-dark-900 mb-2">My Trips</h1>
                <p className="text-gray-600">Manage and view all your travel plans</p>
              </div>
            </div>

            {/* Filters */}
            <div className="card">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  className="input-field md:w-48"
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="generated">Generated</option>
                  <option value="saved">Saved</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Trips Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader size="lg" text="Loading trips..." />
              </div>
            ) : trips.length === 0 ? (
              <EmptyState
                icon={MapIcon}
                title="No trips found"
                description={
                  searchQuery || statusFilter
                    ? 'Try adjusting your filters'
                    : 'Start planning your first adventure'
                }
                actionText={!searchQuery && !statusFilter ? 'Create Trip' : undefined}
                actionLink={!searchQuery && !statusFilter ? '/create-trip' : undefined}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center space-x-2 pt-6">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="btn-secondary disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="btn-secondary disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MyTrips;
