import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import enquiryRoutes from './routes/enquiry.routes';
import consultationRoutes from './routes/consultation.routes';
import adminRoutes from './routes/admin.routes';

export function createApp(): Application {
  const app = express();

  // Trust proxy for Render/Cloud reverse proxies (enables correct client IP in rate-limiters)
  app.set('trust proxy', 1);

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
        if (!origin) return callback(null, true);
        if (
          origin === env.CLIENT_ORIGIN ||
          origin === 'http://localhost:5173' ||
          origin === 'http://127.0.0.1:5173' ||
          origin.endsWith('.onrender.com') ||
          origin.endsWith('.vercel.app')
        ) {
          return callback(null, true);
        }
        return callback(null, true); // Permissive in dev/staging while headers are secured
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body Parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Global Rate Limiter: 200 requests per 15 minutes per IP
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests from this IP, please try again later.' },
  });
  app.use('/api/', globalLimiter);

  // Strict Auth Rate Limiter: 20 attempts per 15 minutes
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many login/register attempts. Please wait 15 minutes.' },
  });
  app.use('/api/v1/auth/login', authLimiter);
  app.use('/api/v1/auth/register', authLimiter);

  // Health Check Endpoint
  app.get('/api/v1/health', (req: Request, res: Response) => {
    res.json({
      status: 'UP',
      service: 'LIC Insurance Advisory API',
      timestamp: new Date().toISOString(),
      advisor: {
        name: env.ADVISOR_NAME,
        phone: `${env.ADVISOR_PRIMARY_PHONE} / ${env.ADVISOR_SECONDARY_PHONE}`,
        email: env.ADVISOR_EMAIL,
      },
    });
  });

  // Mount Versioned Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/enquiries', enquiryRoutes);
  app.use('/api/v1/consultations', consultationRoutes);
  app.use('/api/v1/admin', adminRoutes);

  // Serve Client Bundle if built
  const clientDist = path.resolve(__dirname, '../../client/dist');
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (req: Request, res: Response, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  // 404 Route Handler for unmatched API routes
  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
  });

  // Centralized Error Middleware
  app.use(errorHandler);

  return app;
}
