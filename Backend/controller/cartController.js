// controllers/cartController.js

import Cart from '../model/cart.js';
import Product from '../model/product.js';

// ✅ GET /api/cart → fetch cart
export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
}

// ✅ POST /api/cart → add to cart
export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (quantity < 1) return res.status(400).json({ message: 'Invalid quantity' });
    if (quantity > 5) return res.status(400).json({ message: 'Cannot buy more than 5 units' });
    if (quantity > product.stock) return res.status(400).json({ message: 'Not enough stock' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existingItem = cart.items.find(item => item.product.equals(productId));

    if (existingItem) {
      const newQty = Math.min(5, existingItem.quantity + quantity);
      if (newQty > product.stock)
        return res.status(400).json({ message: 'Exceeds stock' });
      existingItem.quantity = newQty;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtAdd: product.price, // ✅ Add priceAtAdd to item
      });
    }

    await cart.save();
    await cart.populate('items.product'); // ✅ return populated product info

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
}

// ✅ DELETE /api/cart/:productId → remove item
export async function removeFromCart(req, res) {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => !item.product.equals(productId));
    await cart.save();
    await cart.populate('items.product'); // ✅ populate again

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
}
