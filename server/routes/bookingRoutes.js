import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import TableBooking from '../models/TableBooking.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Tighter limit on public writes to stop booking spam / storage abuse.
const createLimiter = rateLimit({ windowMs: 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });

const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120).trim(),
  email: z.string().email('Valid email is required').max(200).trim(),
  phone: z.string().min(1, 'Phone is required').max(30).trim(),
  date: z.string().min(1, 'Date is required').max(40),
  time: z.string().min(1, 'Time is required').max(40),
  guests: z.number().int().min(1, 'At least 1 guest').max(8, 'Maximum 8 guests allowed'),
});

router.post('/', createLimiter, validate(bookingSchema), async (req, res, next) => {
  try {
    const booking = await TableBooking.create(req.validatedBody);
    res.status(201).json({ success: true, data: booking });
  } catch (err) { next(err); }
});

router.get('/availability', async (req, res, next) => {
  try {
    const { date, time } = req.query;
    if (!date || !time) {
      return res.status(400).json({ success: false, message: 'Date and time are required' });
    }
    const bookings = await TableBooking.find({ date, time });
    const booked = bookings.reduce((sum, b) => sum + b.guests, 0);
    const maxCapacity = 40;
    res.json({ success: true, data: { available: maxCapacity - booked, maxCapacity } });
  } catch (err) { next(err); }
});

export default router;
