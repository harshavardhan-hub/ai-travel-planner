import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService } from '@services/tripService';
import { useTrip } from '@hooks/useTrip';
import Navbar from '@components/common/Navbar';
import Sidebar from '@components/common/Sidebar';
import Footer from '@components/common/Footer';
import ItineraryView from '@components/trip/ItineraryView';
import Loader from '@components/common/Loader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const TripResult = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { generateItinerary, updateTrip } = useTrip();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  const loadTrip = async () => {
    try {
      setLoading(true);
      const response = await tripService.getTripById(tripId);
      if (response.success) {
        setTrip(response.data.trip);
      }
    } catch (error) {
      console.error('Failed to load trip:', error);
      toast.error('Failed to load trip details');
      navigate('/my-trips');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!window.confirm('Are you sure you want to regenerate this itinerary? Your current plan will be replaced.')) {
      return;
    }

    try {
      setRegenerating(true);
      const updatedTrip = await generateItinerary(tripId);
      setTrip(updatedTrip);
      toast.success('Itinerary regenerated successfully!');
    } catch (error) {
      console.error('Failed to regenerate:', error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleUpdate = async (dayIndex, updatedDay) => {
    try {
      const updatedDays = [...trip.aiPlan.days];
      updatedDays[dayIndex] = updatedDay;

      const updatedTrip = await updateTrip(tripId, {
        'aiPlan.days': updatedDays,
      });

      setTrip(updatedTrip);
    } catch (error) {
      console.error('Failed to update trip:', error);
    }
  };

  const handleSaveTrip = async () => {
    try {
      const updatedTrip = await updateTrip(tripId, { status: 'saved' });
      setTrip(updatedTrip);
      toast.success('Trip saved successfully!');
    } catch (error) {
      console.error('Failed to save trip:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="lg" text="Loading your trip..." />
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-dark-900 mb-4">Trip not found</h2>
            <button onClick={() => navigate('/my-trips')} className="btn-primary">
              Go to My Trips
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/my-trips')}
                className="btn-ghost"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Trips
              </button>
              {trip.status !== 'saved' && (
                <button onClick={handleSaveTrip} className="btn-primary">
                  Save Trip
                </button>
              )}
            </div>

            {/* Trip Title */}
            <div className="card">
              <h1 className="text-3xl font-bold text-dark-900 mb-2">{trip.destination}</h1>
              <p className="text-gray-600">
                {new Date(trip.dateRange.startDate).toLocaleDateString()} - {new Date(trip.dateRange.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Itinerary */}
            {trip.aiPlan && trip.aiPlan.days ? (
              <ItineraryView
                trip={trip}
                onUpdate={handleUpdate}
                onRegenerate={handleRegenerate}
                loading={regenerating}
              />
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">No itinerary generated yet.</p>
                <button onClick={handleRegenerate} className="btn-primary">
                  Generate Itinerary
                </button>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TripResult;
