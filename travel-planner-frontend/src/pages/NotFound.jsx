import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-dark-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <HomeIcon className="h-5 w-5 mr-2" />
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
