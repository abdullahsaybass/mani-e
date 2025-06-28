// SubscriptionSection.jsx
import React from 'react';
import './SubscriptionSection.css';

const SubscriptionSection = () => (
  <section className="subscription-section">
    <div className="container">
      <div className="image-wrapper">
        <img
          src="/images/subscription-saree.jpg"
          alt="Subscription Offer"
          className="subscription-image"
        />
      </div>

      <div className="content-wrapper">
        <p className="sub-title">SPECIAL OFFERS FOR SUBSCRIBERS</p>
        <h2 className="main-title">
          NEW OFFERS EVERY WEEK <span className="highlight">+ DISCOUNT</span>
          <br />
          OFF FROM <span className="highlight">20%</span>+ BEST HOT PRICES
        </h2>
        <p className="description">
          Join our subscriber list and unlock exclusive discounts, early access
          to new arrivals, and special festive offers available only to our
          community.
        </p>

        <form className="subscription-form" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
          />
          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default SubscriptionSection;