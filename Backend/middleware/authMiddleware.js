import jwt from 'jsonwebtoken';
import User from '../model/user.js'; // Adjust the path if needed
import { asyncHandler } from './asyncHandler.js'; // Make sure this is defined

// Middleware to protect routes
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token; // ✅ Read token from cookie

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB without password
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
      });
    }

    req.user = user; // ✅ Attach user to request
    next(); // ✅ Allow request to continue
  } catch (error) {
    console.error('❌ [protect middleware] Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
});
