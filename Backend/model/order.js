// models/Order.js
// import mongoose from 'mongoose';

// const orderItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   quantity: Number,
//   priceAtPurchase: Number,
// });

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   items: [orderItemSchema],
//   total: Number,
//   status: { type: String, default: 'Pending' },
// }, { timestamps: true });

// export default mongoose.model('Order', orderSchema);
// models/Cart.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      priceAtPurchase: Number, // ← Optional, useful for analytics
    },
  ],
  totalAmount: Number,
  address: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  status: {
    type: String,
    default: 'Pending',
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
