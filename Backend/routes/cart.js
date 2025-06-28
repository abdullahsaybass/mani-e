// // routes/cart.js
// import express from 'express';
// import { requireAuth } from '../middleware/auth.js';
// import { getCart, addToCart, removeFromCart } from '../controller/cartController.js';

// const router = express.Router();
// router.use(requireAuth);

// router.get('/', getCart);
// router.post('/add', addToCart);
// router.delete('/remove/:productId', removeFromCart);

// export default router;

import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getCart);                    // GET    /api/cart
router.post('/', isAuthenticated, addToCart);                 // POST   /api/cart
router.delete('/:productId', isAuthenticated, removeFromCart); // DELETE /api/cart/:productId

export default router;


