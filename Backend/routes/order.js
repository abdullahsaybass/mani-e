import express from 'express';
import { placeOrder, getOrders } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Use the protect middleware for authentication
router.post('/', protect, placeOrder);
router.get('/', protect, getOrders);

export default router;
