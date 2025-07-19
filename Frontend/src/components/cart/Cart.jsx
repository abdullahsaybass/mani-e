import React, { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { AppContext } from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

export default function CartPage() {
  const { backendUrl, userData } = useContext(AppContext);
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
          price: Number(item.priceAtAdd || 0),
          originalPrice: Number(item.product.originalPrice || 0),
          image: item.product.mainImage,
          size: item.product.size || "-",
          color: item.product.color || "",
          description: item.product.description || "",
          quantity: Number(item.quantity || 1),
        }));
        setCartItems(items);
      } else {
        console.error("Failed to load cart:", json.message);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setLoadingItemId(productId);
    try {
      const res = await fetch(`${backendUrl}/api/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (res.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleOrderNow = async () => {
    try {
      const authRes = await fetch(`${backendUrl}/api/user/me`, {
        credentials: "include",
      });
      if (!authRes.ok) return navigate("/login");

      const addressId = userData?.defaultAddressId || "default-address-id";
      navigate("/buy-now", {
        state: {
          fromCart: true,
          cartItems,
          addressId,
        },
      });
    } catch (err) {
      console.error("Error navigating to buy-now:", err);
    }
  };

  const getMainImgUrl = (imgPath) => {
    if (!imgPath) return "/fallback.jpg";
    return imgPath.includes("/uploads")
      ? `${backendUrl}${imgPath.slice(imgPath.indexOf("/uploads"))}`
      : imgPath;
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <h2>Your cart is empty!</h2>
            <p>Add items to it now.</p>
            <Link to="/" className="shop-now-btn">Shop now</Link>
          </div>
        ) : (
          <>
            <div className="cart-left-section">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="cart-card">
                    <div className="cart-product-image">
                      <img
                        src={getMainImgUrl(item.image)}
                        alt={item.title}
                        onError={(e) => (e.target.src = "/fallback.jpg")}
                      />
                    </div>
                    <div className="cart-product-details">
                      <h3>{item.title}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                          ₹{item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <>
                            <span style={{ textDecoration: "line-through", color: "#999" }}>
                              ₹{item.originalPrice}
                            </span>
                            <span style={{ color: "green", fontWeight: "500" }}>
                              {Math.round(
                                ((item.originalPrice - item.price) / item.originalPrice) * 100
                              )}
                              % OFF
                            </span>
                          </>
                        )}
                      </div>

                      {item.color && (
                        <p className="highlight">
                          Color:
                          <span
                            style={{
                              display: "inline-block",
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              backgroundColor: item.color,
                              border: "1px solid #ccc",
                              marginLeft: "6px",
                              verticalAlign: "middle",
                            }}
                          ></span>
                        </p>
                      )}

                      <p>{item.description}</p>

                      <div className="quantity-controller">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || loadingItemId === item.id}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={loadingItemId === item.id}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />
                </div>
              ))}
            </div>

            <div className="cart-right-section">
              <div className="price-details-box">
                <h3>PRICE DETAILS</h3>
                <div className="price-row">
                  <span>Total Products</span>
                  <span>{totalItems}</span>
                </div>
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="price-row">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <hr />
                <div className="price-row total">
                  <strong>Total Amount</strong>
                  <strong>₹{subtotal.toFixed(0)}</strong>
                </div>
                <button className="place-order-btn" onClick={handleOrderNow}>
                  PLACE ORDER
                </button>
                
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
