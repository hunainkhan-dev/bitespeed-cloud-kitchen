import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

// Refuse to boot in production with a weak/default admin secret.
if (process.env.NODE_ENV === 'production') {
  const key = process.env.ADMIN_KEY || '';
  if (key.length < 24 || key === 'bitespeed-staff-2024') {
    console.error('FATAL: ADMIN_KEY must be a strong, unique secret (24+ chars) in production.');
    process.exit(1);
  }
  if (!process.env.CLIENT_URL) {
    console.error('FATAL: CLIENT_URL must be set in production so CORS is not left open.');
    process.exit(1);
  }
}

connectDB();

// Behind a hosting proxy (Render/Railway/Fly) so rate-limit sees the real client IP.
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '100kb' })); // payloads are small JSON; cap to shrink DoS surface
app.use(cookieParser());
app.use(mongoSanitize()); // strip $ / . operators to block NoSQL injection

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BiteSpeed API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`BiteSpeed server running on port ${PORT}`));
