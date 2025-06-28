// routes/authRoutes.js
import express from 'express';
import { register, login, logout, isAuthenticated, resetPassword, sendResetPasswordEmail } from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/authenticated', isAuthenticated);
router.post('/forgot-password', sendResetPasswordEmail); // ✅ THIS LINE IS NEEDED
router.put('/reset-password/:token', resetPassword);     // ✅ This too

export default router;
