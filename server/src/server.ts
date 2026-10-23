import { createApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 LIC Insurance Advisory Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  logger.info(`🛡️ Advisor: ${env.ADVISOR_NAME} | Email: ${env.ADVISOR_EMAIL} | Phone: ${env.ADVISOR_PRIMARY_PHONE}`);
  logger.info(`🔗 API Healthcheck available at http://localhost:${env.PORT}/api/v1/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});
