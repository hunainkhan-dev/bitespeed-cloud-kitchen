import crypto from 'crypto';
import { AppError } from './errorHandler.js';

/**
 * Gate admin-only routes behind a shared secret sent in the `x-admin-key` header.
 * Uses a constant-time comparison so the endpoint does not leak the key via
 * response-timing differences. The expected key lives ONLY on the server
 * (process.env.ADMIN_KEY) — it must never be shipped to the browser bundle.
 */
export const requireAdmin = (req, res, next) => {
  const provided = String(req.headers['x-admin-key'] || '');
  const expected = String(process.env.ADMIN_KEY || '');

  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);

  const valid =
    expected.length > 0 &&
    providedBuf.length === expectedBuf.length &&
    crypto.timingSafeEqual(providedBuf, expectedBuf);

  if (!valid) {
    return next(new AppError('Unauthorized: invalid or missing admin key', 401));
  }
  next();
};
