
import Order from '../model/order.js';
import Cart from '../model/cart.js';
import Product from '../model/product.js';

export async function placeOrder(req, res) {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of cart.items) {
      const prod = item.product;
      const quantity = item.quantity;

      if (quantity > prod.stock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${prod.title}`,
        });
      }

      totalAmount += prod.price * quantity;
      orderProducts.push({
        productId: prod._id,
        quantity,
        priceAtPurchase: prod.price,
      });
    }

    const newOrder = new Order({
      userId,
      products: orderProducts,
      totalAmount,
      address,
    });

    await newOrder.save();

    await Promise.all(
      orderProducts.map(item =>
        Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        })
      )
    );

    cart.items = [];
    await cart.save();

    res.json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('❌ Error placing order:', err);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
}
