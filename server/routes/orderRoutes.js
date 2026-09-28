import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import CustomerOrder from '../models/CustomerOrder.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { validate } from '../middleware/validate.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

// Tighter limit on public order creation to stop flooding.
const createLimiter = rateLimit({ windowMs: 60 * 1000, max: 15, standardHeaders: true, legacyHeaders: false });

const orderSchema = z.object({
  items: z.array(z.object({
    menuItem: z.string().min(1).max(60),
    name: z.string().min(1).max(120),
    price: z.number().min(0).max(100000),
    quantity: z.number().int().min(1).max(99),
  })).min(1, 'Order must have at least one item').max(100),
  total: z.number().positive('Total must be positive').max(1000000),
  customerName: z.string().min(1, 'Customer name is required').max(120).trim(),
  customerPhone: z.string().min(1, 'Phone is required').max(30).trim(),
  deliveryAddress: z.string().min(1, 'Address is required').max(300).trim(),
});

const statusSchema = z.object({
  status: z.enum(['Pending', 'Preparing', 'Completed']),
});

router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: 1 });
    res.json({ success: true, data: orders });
  } catch (err) { next(err); }
});

router.post('/', createLimiter, validate(orderSchema), async (req, res, next) => {
  try {
    const order = await CustomerOrder.create(req.validatedBody);
    res.status(201).json({ success: true, data: order });
  } catch (err) { next(err); }
});

router.patch('/:id/status', requireAdmin, validate(statusSchema), async (req, res, next) => {
  try {
    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.validatedBody.status },
      { new: true }
    );
    if (!order) return next(new AppError('Order not found', 404));
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
});

export default router;
