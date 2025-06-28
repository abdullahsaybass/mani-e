// models/user.js

import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  label: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    addresses: [addressSchema], // ✅ Include this field
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
export default User;
