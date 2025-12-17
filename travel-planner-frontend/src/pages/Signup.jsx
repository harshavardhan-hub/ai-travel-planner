import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import SignupForm from '@components/auth/SignupForm';
import { LOGO_URL, APP_NAME } from '@utils/constants';
import { motion } from 'framer-motion';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    setLoading(true);
    try {
      await signup(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <div className="text-center mb-8">
            <img src={LOGO_URL} alt={APP_NAME} className="h-16 w-16 mx-auto mb-4 rounded-xl" />
            <h1 className="text-3xl font-bold text-dark-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Start planning your dream trips today</p>
          </div>

          <SignupForm onSubmit={handleSignup} loading={loading} />
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
