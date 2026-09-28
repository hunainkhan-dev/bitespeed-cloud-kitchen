import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const customerOrderSchema = new mongoose.Schema({
  items: { type: [orderItemSchema], required: true, validate: v => v.length > 0 },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Completed'],
    default: 'Pending',
  },
  total: { type: Number, required: true, min: 0 },
  customerName: { type: String, required: true, trim: true },
  customerPhone: { type: String, required: true, trim: true },
  deliveryAddress: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model('CustomerOrder', customerOrderSchema);
