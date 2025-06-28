// controller/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../model/user.js';
import transporter from '../config/nodemailer.js';

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

// ✅ POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const savedUser = await new User({ name, email, password: hashedPassword }).save();

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Welcome to ManiTextile',
        text: `Hi ${name},\n\nThanks for registering at ManiTextile!\n\n—The ManiTextile Team`,
      });
    } catch (err) {
      console.error('❌ Email error:', err.message);
    }

    return res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// ✅ POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login error', error: err.message });
  }
};

// ✅ GET /api/auth/authenticated
export const isAuthenticated = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error('User not found');

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ✅ POST /api/auth/logout
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  });
  return res.json({ success: true, message: 'Logout successful' });
};

// ✅ POST /api/auth/forgot-password
export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'No account with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600_000;
    await user.save();

    const resetUrl = `${CLIENT_URL}/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'ManiTextile Password Reset',
      text: `Hi ${user.name},\n\nClick the link to reset your password:\n${resetUrl}\n\nIt expires in 1 hour.`,
    });

    return res.json({ success: true, message: 'Password reset email sent.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error sending email' });
  }
};

// ✅ PUT /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) return res.status(400).json({ success: false, message: 'Password required' });

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Reset failed' });
  }
};
