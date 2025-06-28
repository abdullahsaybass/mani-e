import React from "react";
import "./Trackorder.css";

const TrackOrder = () => {
  return (
    <div className="track-wrapper">
      <div className="breadcrumb">HOME &gt; CHECKOUT</div>

      <h4 className="sub-message">YOUR ORDER HAS BEEN SUCCESSFULLY ADOPTED</h4>
      <h1 className="main-heading">TRACK YOUR ORDER NOW</h1>
      <p className="track-desc">
        Enter your order ID or registered mobile number to check the real-time status of your shipment.
        Whether it's processing, shipped, or out for delivery – you'll know exactly where your order is.
      </p>

      <div className="track-form">
        <input type="text" placeholder="Order ID" className="track-input" />
        <input type="email" placeholder="Billing email" className="track-input" />
        <button className="track-btn">TRACK</button>
      </div>
    </div>
  );
};

export default TrackOrder;
