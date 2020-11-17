const { getLogger } = require('log4js');

// Load environment variables from the .env file.
try {
    require('dotenv').config();
  } catch (err) {
    console.log('No .env file loaded');
  }

exports.databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/odos';
exports.port = process.env.PORT || '3000';
exports.bcryptCostFactor = 10;
// On Heroku, must put a env. var. for the secret key (random caracters string)
exports.secretKey = process.env.SECRET_KEY || 'changeme';
exports.baseUrl = process.env.BASE_URL || `http://localhost:${exports.port}`;

/**
 * Creates a named logger for the application.
 * @param {string} name - The logger's name (will be part of each log line).
 * @returns {Logger} A configured logger.
 */
exports.createLogger = function(name) {

  const logger = getLogger(name);
  logger.level = exports.logLevel;

  return logger;
};

// Validate that port is a positive integer.
// if (process.env.PORT) {
//     const parsedPort = parseInt(process.env.PORT, 10);
//     if (!Number.isInteger(parsedPort)) {
//       throw new Error('Environment variable $PORT must be an integer');
//     } else if (parsedPort < 1 || parsedPort > 65535) {
//       throw new Error('Environment variable $PORT must be a valid port number');
//     }
//   }
