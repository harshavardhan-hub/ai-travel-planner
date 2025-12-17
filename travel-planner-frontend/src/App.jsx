import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import AppRouter from './router';
import Loader from '@components/common/Loader';

function App() {
  const { loading } = useAuth();

  useEffect(() => {
    document.title = 'Travel Planner - AI-Powered Itinerary Generator';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return <AppRouter />;
}

export default App;
