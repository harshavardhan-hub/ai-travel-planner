import app from './app.js';
import { config } from './config/env.js';
import connectDB from './config/database.js';
import { logger } from './utils/logger.js';

const PORT = config.port;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.success(`🚀 Server running in ${config.env} mode on port ${PORT}`);
      logger.info(`📍 API URL: http://localhost:${PORT}/api`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.warn('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

startServer();
