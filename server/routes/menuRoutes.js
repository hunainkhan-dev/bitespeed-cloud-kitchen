import { Router } from 'express';
import { z } from 'zod';
import MenuItem from '../models/MenuItem.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { validate } from '../middleware/validate.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120).trim(),
  description: z.string().min(1, 'Description is required').max(1000).trim(),
  price: z.number().positive('Price must be a positive number').max(100000),
  category: z.enum(['Appetizers', 'Mains', 'Drinks', 'Desserts']),
  image: z
    .string()
    .trim()
    .max(500)
    .url('Image must be a valid URL')
    .refine((u) => /^https?:\/\//i.test(u), 'Image must be an http(s) URL')
    .optional()
    .or(z.literal('')),
  tags: z.array(z.enum(['Vegan', 'Spicy', 'Gluten-Free'])).optional().default([]),
  available: z.boolean().optional().default(true),
});

router.get('/', async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, name: 1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
});

router.post('/', requireAdmin, validate(menuItemSchema), async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.validatedBody);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.put('/:id', requireAdmin, validate(menuItemSchema.partial()), async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.validatedBody, { new: true, runValidators: true });
    if (!item) return next(new AppError('Menu item not found', 404));
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return next(new AppError('Menu item not found', 404));
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) { next(err); }
});

export default router;
