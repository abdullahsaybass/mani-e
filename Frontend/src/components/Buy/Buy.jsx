import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Home/Navbar/Header";
import Footer from "../Home/Footer/Footer";
import "./Buy.css";

const Checkout = () => {
  const { backendUrl, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    fromCart = false,
    cartItems = [],
    order = null,
    productId,
    quantity = 1,
    selectedColor = "",
  } = location.state || {};

  const [product, setProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
    label: "",
    address: "",
  });

  useEffect(() => {
    if (!isLoggedIn) return navigate("/login");
    if (!fromCart) fetchProduct();
    fetchAddresses();
  }, [isLoggedIn]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/products/${productId}`);
      const json = await res.json();
      if (res.ok) setProduct(json.product);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/address`, {
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok) {
        setAddresses(json.addresses || []);
        if (json.addresses.length > 0) {
          setSelectedAddress(json.addresses[0]._id);
        }
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Please select an address.");

    const address = addresses.find((a) => a._id === selectedAddress);
    if (!address) return alert("Invalid address selected");

    try {
      const res = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Order placed successfully!");
        navigate("/order-success");
      } else {
        alert(json.message || "Order failed");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "phone", "address", "city", "state", "pincode"];
    for (let field of requiredFields) {
      if (!form[field]) return alert(`Please fill ${field}`);
    }

    try {
      const res = await fetch(`${backendUrl}/api/user/address`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (res.ok) {
        alert("Address added successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          state: "",
          pincode: "",
          label: "",
          address: "",
        });
        fetchAddresses();
      } else {
        alert(json.message || "Failed to add address");
      }
    } catch (err) {
      console.error("Add address error:", err);
      alert("Something went wrong");
    }
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "/fallback.jpg";
    return imgPath.includes("/uploads")
      ? `${backendUrl}${imgPath.slice(imgPath.indexOf("/uploads"))}`
      : imgPath;
  };

  const cartSubtotal = fromCart
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : product
    ? product.price * quantity
    : 0;

  const shipping = 99;
  const totalAmount = cartSubtotal + shipping;

  return (
    <div>
      <Header />
      <div className="checkout-wrapper">
        <div className="checkout-container">
          <div className="checkout-left">
            <h2>Shipping Address</h2>

            {addresses.length > 0 && (
              <>
                <h4>Select Saved Address</h4>
                {addresses.map((addr) => (
                  <label key={addr._id} className="address-box">
                    <input
                      type="radio"
                      name="address"
                      value={addr._id}
                      checked={selectedAddress === addr._id}
                      onChange={() => setSelectedAddress(addr._id)}
                    />
                    <div className="address-content">
                      <strong>{addr.name}</strong> ({addr.label})<br />
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </div>
                  </label>
                ))}
              </>
            )}

            <h4>Add New Address (Optional)</h4>
            <form onSubmit={handleAddAddress}>
              <input name="name" placeholder="Full Name" onChange={handleChange} value={form.name} />
              <input name="email" placeholder="Email (optional)" onChange={handleChange} value={form.email} />
              <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
              <input name="address" placeholder="Address" onChange={handleChange} value={form.address} />
              <input name="label" placeholder="Label (e.g. Home/Office)" onChange={handleChange} value={form.label} />
              <input name="country" placeholder="Country" onChange={handleChange} value={form.country} />
              <div className="location-grid">
                <input name="city" placeholder="City" onChange={handleChange} value={form.city} />
                <input name="state" placeholder="State" onChange={handleChange} value={form.state} />
                <input name="pincode" placeholder="PIN Code" onChange={handleChange} value={form.pincode} />
              </div>
              <button type="submit" className="pay-btn" style={{ marginTop: "10px" }}>
                Add Address
              </button>
            </form>
          </div>

          <div className="checkout-right">
            <h4>Review Your Cart</h4>
            {fromCart ? (
              cartItems.map((item) => (
                <div className="cart-item styled-box" key={item.id}>
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.title} 
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                  <div className="item-details">
                    <p><strong>Name:</strong> {item.title}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Color:</strong> {item.color}</p>
                    <p><strong>Price:</strong> ₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : product ? (
              <div className="cart-item styled-box">
                <img 
                  src={getImageUrl(product.mainImage)} 
                  alt={product.title} 
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
                <div className="item-details">
                  <p><strong>Name:</strong> {product.title}</p>
                  <p><strong>Quantity:</strong> {quantity}</p>
                  <p><strong>Color:</strong> {selectedColor}</p>
                  <p><strong>Price:</strong> ₹{(product.price * quantity).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <p>Loading product...</p>
            )}

            <div className="summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button className="pay-btn" onClick={handlePlaceOrder} disabled={!selectedAddress}>
              Place Order
            </button>

            <div className="secure-box">
              🔒 Secure Checkout – SSL Encrypted
              <p>All personal and payment info is protected.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;