// models/Cart.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  priceAtAdd: { type: Number, required: true }, // Captures price at the time of adding
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [itemSchema],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
