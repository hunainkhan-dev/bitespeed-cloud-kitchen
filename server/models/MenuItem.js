import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0.01 },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Mains', 'Drinks', 'Desserts'],
  },
  image: { type: String, default: '' },
  tags: [{ type: String, enum: ['Vegan', 'Spicy', 'Gluten-Free'] }],
  available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
