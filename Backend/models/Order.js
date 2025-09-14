import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  product_title: { type: String, required: true },
  product_image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], default: 'pending' },
  shippingInfo: {
    address: { type: String },
    phone: { type: String },
    note: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema); 