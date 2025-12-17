import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import LoginForm from '@components/auth/LoginForm';
import { LOGO_URL, APP_NAME } from '@utils/constants';
import { motion } from 'framer-motion';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
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
            <h1 className="text-3xl font-bold text-dark-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to continue planning your trips</p>
          </div>

          <LoginForm onSubmit={handleLogin} loading={loading} />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
