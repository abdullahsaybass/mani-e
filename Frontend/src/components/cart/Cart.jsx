import React, { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { backendUrl } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/cart`, {
        method: "GET",
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok) {
        const items = json.items.map((item) => ({
          id: item.product._id,
          title: item.product.title,
          price: item.priceAtAdd,
          originalPrice: item.product.originalPrice,
          image: item.product.mainImage,
          size: item.product.size || "-",
          color: item.product.color || "",
          description: item.product.description || "",
          quantity: item.quantity,
          badge: item.product.badge || "",
        }));
        setCartItems(items);
      } else {
        console.error("Failed to load cart:", json.message);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    setLoadingItemId(id);
    try {
      const res = await fetch(`${backendUrl}/api/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity: newQuantity }),
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setLoadingItemId(null);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleOrderNow = async () => {
    try {
      const authRes = await fetch(`${backendUrl}/api/user/me`, {
        credentials: "include",
      });
      if (!authRes.ok) return navigate("/login");

      const addrRes = await fetch(`${backendUrl}/api/user/address`, {
        credentials: "include",
      });
      const addrJson = await addrRes.json();

      if (!addrJson.addresses || addrJson.addresses.length === 0) {
        return navigate("/buy");
      }

      // If everything is fine, go to buy page with cart items
      navigate("/buy", {
        state: {
          fromCart: true,
          cartItems,
        },
      });
    } catch (err) {
      console.error("Error during order pre-check:", err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-wrapper">
      <div className="cart-main">
        <div className="cart-left">
          <h1>Shopping Cart</h1>
          <a className="deselect-link" href="#">Deselect all items</a>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <input type="checkbox" defaultChecked />
                <img src={`${backendUrl}${item.image}`} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h2>{item.title}</h2>
                  <p className="stock">In stock</p>
                  <p className="desc-line">{item.description}</p>
                  <p><strong>Colour:</strong> {item.color}</p>
                  <div className="actions">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1 || loadingItemId === item.id}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={loadingItemId === item.id}>+</button>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                  </div>
                </div>
                <div className="item-price">
                  {item.badge && <span className="badge">{item.badge}</span>}
                  <p className="price">₹{item.price.toLocaleString()}</p>
                  {item.originalPrice && <p className="mrp">M.R.P.: ₹{item.originalPrice}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-subtotal-bottom">
            <strong>Subtotal ({cartItems.length} items):</strong> ₹{subtotal.toLocaleString()}
          </div>

          <div className="saved-items">
            <h2>Your Items</h2>
            <div className="tabs">
              <span>No items saved for later</span>
              <span className="tab-active">Buy it again</span>
            </div>
            <div className="empty-items">No items</div>
          </div>
        </div>

        <div className="cart-right">
          <div className="checkout-box">
            <p className="free-delivery-msg">✅ Your order is eligible for FREE Delivery. <a href="#">Choose FREE Delivery</a> option at checkout.</p>
            <p><strong>Subtotal ({cartItems.length} items):</strong> ₹{subtotal.toLocaleString()}</p>
            <label><input type="checkbox" /> This order contains a gift</label>
            <button className="proceed-btn" onClick={handleOrderNow}>Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
