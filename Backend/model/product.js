// model/product.js
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  color:    { type: String, required: true },
  size:     { type: String, required: false },
  quantity: { type: Number, default: 0, min: 0 },
  price:    { type: Number, required: true }, // ✅ NEW
});

const productSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 }, // base price
  category:    { type: String, required: true },
  subcategory: { type: String },
  gender:      { type: String, enum: ['Male', 'Female', 'Unisex', 'Kids'], required: true },
  brand:       { type: String },
  date:        { type: Date },

  colors: {
    type: [String],
    default: [],
  },

  mainImage: { type: String, required: true },
  images: {
    type: [String],
    validate: [arr => arr.length <= 4, '{PATH} exceeds 4 images'],
  },

  variants: {
    type: [stockSchema],
    validate: [arr => arr.length > 0, 'At least one variant is required'], // ✅ required
  },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
