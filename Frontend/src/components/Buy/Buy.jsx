import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Buy.css";
import Header from '../Home/Navbar/Header'
import Footer from '../Home/Footer/Footer'


export default function BuyNow() {
  const { backendUrl, isLoggedIn, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { productId, quantity, selectedColor } = location.state || {};

  const [product, setProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "", phone: "", label: "", address: "", city: "", state: "", pincode: ""
  });

  useEffect(() => {
    if (!isLoggedIn) return navigate("/login");
    fetchAddresses();
    if (productId) fetchProduct();
  }, [isLoggedIn]);

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

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/products/${productId}`);
      const json = await res.json();
      if (res.ok) setProduct(json.product);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const handleAddNewAddress = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/address`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData._id, ...newAddress }),
      });

      const json = await res.json();
      if (res.ok) {
        await fetchAddresses();
        setShowAddressForm(false);
        setNewAddress({ name: "", phone: "", label: "", address: "", city: "", state: "", pincode: "" });
      } else {
        alert(json.message || "Failed to add address");
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Please select an address");
    const address = addresses.find(a => a._id === selectedAddress);
    if (!address) return alert("Address not found");

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
        alert(json.message || "Failed to place order");
      }
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("Failed to place order. Check console for details.");
    }
  };

  return (
    <div>
      <Header />
      
      <div className="checkout-container">
      <div className="checkout-main">
        <div className="section">
          <h2>Add delivery address</h2>

          {addresses.map((addr) => (
            <label key={addr._id} className="address-box">
              <input
                type="radio"
                name="address"
                value={addr._id}
                checked={selectedAddress === addr._id}
                onChange={() => setSelectedAddress(addr._id)}
              />
              <div>
                <strong>{addr.name}</strong> ({addr.label})<br />
                {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
              </div>
            </label>
          ))}

          <button className="yellow-button" onClick={() => setShowAddressForm(!showAddressForm)}>
            {showAddressForm ? "Cancel" : "Add a new delivery address"}
          </button>

          {showAddressForm && (
            <form className="address-form" onSubmit={(e) => { e.preventDefault(); handleAddNewAddress(); }}>
              <input placeholder="Name" value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} required />
              <input placeholder="Phone" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} required />
              <input placeholder="Label (Home/Office)" value={newAddress.label} onChange={e => setNewAddress({ ...newAddress, label: e.target.value })} />
              <input placeholder="Address" value={newAddress.address} onChange={e => setNewAddress({ ...newAddress, address: e.target.value })} required />
              <input placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} required />
              <input placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} required />
              <input placeholder="Pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} required />
              <button type="submit" className="save-address-btn">Save Address</button>
            </form>
          )}
        </div>

        <div className="section">
          <h2>Review items and shipping</h2>
          {product ? (
            <div className="order-item">
              <img src={`${backendUrl}${product.mainImage}`} alt={product.title} width={100} />
              <div>
                <h3>{product.title}</h3>
                <p>Qty: {quantity}</p>
                <p>Color: {selectedColor}</p>
                <p>Total: ₹{(product.price * quantity).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <p>Loading product...</p>
          )}
        </div>

        <div className="help-section">
          <p>
            Need help? Check our <a href="#">help pages</a> or <a href="#">contact us 24x7</a>
          </p>
          <p>
            When your order is placed, we’ll send you an e-mail message acknowledging
            receipt of your order. If you choose to pay using an electronic payment method
            (credit card, debit card or net banking), you will be directed to your bank’s
            website to complete your payment. Your contract to purchase an item will not
            be complete until we receive your electronic payment and dispatch your item.
            If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net
            banking when you receive your item.
          </p>
          <p>
            See Amazon.in’s <a href="#">Return Policy</a>.
          </p>
          <a className="back-to-cart" href="#">Back to cart</a>
        </div>
      </div>

      <div className="checkout-summary">
        <button className="deliver-button" disabled={!selectedAddress} onClick={handlePlaceOrder}>
          Deliver to this address
        </button>
        <div className="summary-details">
          <p><strong>Items:</strong> ₹{product ? (product.price * quantity).toLocaleString() : "--"}</p>
          <p><strong>Delivery:</strong> ₹99</p>
          <p><strong>Order Total:</strong> ₹{product ? (product.price * quantity + 99).toLocaleString() : "--"}</p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
} 


// import React from "react";
// import "./Buy.css";

// export default function Checkout() {
//   return (
//     <div className="checkout-container">
//       <div className="checkout-main">
//         <div className="section">
//           <h2>Add delivery address</h2>
//           <button className="yellow-button">Add a new delivery address</button>
//         </div>

//         <div className="section">
//           <h2>Payment method</h2>
//         </div>

//         <div className="section">
//           <h2>Review items and shipping</h2>
//         </div>

//         <div className="help-section">
//           <p>
//             Need help? Check our <a href="#">help pages</a> or <a href="#">contact us 24x7</a>
//           </p>
//           <p>
//             When your order is placed, we’ll send you an e-mail message acknowledging
//             receipt of your order. If you choose to pay using an electronic payment method
//             (credit card, debit card or net banking), you will be directed to your bank’s
//             website to complete your payment. Your contract to purchase an item will not
//             be complete until we receive your electronic payment and dispatch your item.
//             If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net
//             banking when you receive your item.
//           </p>
//           <p>
//             See Amazon.in’s <a href="#">Return Policy</a>.
//           </p>
//           <a className="back-to-cart" href="#">Back to cart</a>
//         </div>
//       </div>

//       <div className="checkout-summary">
//         <button className="deliver-button">Deliver to this address</button>
//         <div className="summary-details">
//           <p><strong>Items:</strong> --</p>
//           <p><strong>Delivery:</strong> --</p>
//           <p><strong>Order Total:</strong> --</p>
//         </div>
//       </div>
//     </div>
//   );
// }