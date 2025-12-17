import { Link } from 'react-router-dom';
import { APP_NAME, LOGO_URL } from '@utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* ✅ ADDED LOGO */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img src={LOGO_URL} alt={APP_NAME} className="h-10 w-10 rounded-lg" />
              <h3 className="text-base sm:text-lg font-bold text-dark-900">{APP_NAME}</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              AI-powered travel planning platform. Create personalized itineraries with intelligent recommendations.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-dark-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create-trip" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600">
                  Create Trip
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600">
                  My Trips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-dark-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
