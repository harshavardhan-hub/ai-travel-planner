import { config } from '../config/env.js';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

export const logger = {
  info: (message, data = '') => {
    if (config.env === 'development') {
      console.log(`${colors.blue}ℹ️  INFO:${colors.reset}`, message, data);
    }
  },
  success: (message, data = '') => {
    console.log(`${colors.green}✅ SUCCESS:${colors.reset}`, message, data);
  },
  warn: (message, data = '') => {
    console.warn(`${colors.yellow}⚠️  WARNING:${colors.reset}`, message, data);
  },
  error: (message, error = '') => {
    console.error(`${colors.red}❌ ERROR:${colors.reset}`, message, error);
  },
  debug: (message, data = '') => {
    if (config.env === 'development') {
      console.log(`${colors.magenta}🔍 DEBUG:${colors.reset}`, message, data);
    }
  },
};

export default logger;
