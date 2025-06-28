import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { addAddress, getAddresses } from '../controller/userContoller.js';

const router = express.Router();

// Get current logged-in user
router.get('/me', isAuthenticated, (req, res) => {
  res.json(req.user);
});

// Add a new address
router.post('/address', isAuthenticated, addAddress);

// Get all addresses
router.get('/address', isAuthenticated, getAddresses);

export default router;
