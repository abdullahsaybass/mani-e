import express from 'express';
import {
  register,
  login,
  logout,
  isAuthenticated as authCheck,
  sendResetPasswordEmail,
  resetPassword,
} from '../controller/authController.js';

const router = express.Router();

// ✅ Auth routes
router.post('/register', register);               // Register user
router.post('/login', login);                     // Login user
router.post('/logout', logout);                   // Logout user

// ✅ THIS IS THE CRITICAL LINE (must be GET for session check on refresh)
router.get('/authenticated', authCheck);          // Check auth status

// ✅ Password reset routes
router.post('/forgot-password', sendResetPasswordEmail);
router.put('/reset-password/:token', resetPassword);

export default router;
