import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '@hooks/useTrip';
import Navbar from '@components/common/Navbar';
import Sidebar from '@components/common/Sidebar';
import Footer from '@components/common/Footer';
import TripWizard from '@components/trip/TripWizard';
import Loader from '@components/common/Loader';
import { motion } from 'framer-motion';

const CreateTrip = () => {
  const navigate = useNavigate();
  const { createTrip, generateItinerary, loading } = useTrip();
  const [generatingItinerary, setGeneratingItinerary] = useState(false);

  const handleTripComplete = async (tripData) => {
    try {
      setGeneratingItinerary(true);
      
      const createdTrip = await createTrip(tripData);
      const tripWithItinerary = await generateItinerary(createdTrip._id);
      
      navigate(`/trip/${tripWithItinerary._id}`);
    } catch (error) {
      console.error('Failed to create trip:', error);
      setGeneratingItinerary(false);
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
            className="max-w-6xl mx-auto"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-dark-900 mb-1">Create New Trip</h1>
              <p className="text-sm text-gray-600">Tell us about your travel plans and we'll create a perfect itinerary</p>
            </div>

            {generatingItinerary ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Loader size="lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-1">
                      Creating Your Perfect Itinerary ✨
                    </h3>
                    <p className="text-sm text-gray-600">
                      Our AI is analyzing your preferences and crafting a personalized travel plan...
                    </p>
                  </div>
                  <div className="max-w-md mx-auto">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <TripWizard onComplete={handleTripComplete} loading={loading} />
            )}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CreateTrip;
