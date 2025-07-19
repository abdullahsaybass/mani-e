import React from 'react';
import './SubscriptionSection.css';
import { assets } from '../../../assets/assets';

const SubscriptionSection = () => (
  <section className="subscription-section">
    <div className="container">
      {/* Image First */}
      <div className="image-wrapper">
        <img
          src={assets.subs}
          alt="Subscription Offer"
          className="subscription-image"
        />
      </div>

      {/* Text + Form */}
      <div className="content-wrapper">
        <p className="sub-title">SPECIAL OFFERS FOR SUBSCRIBERS</p>
        <h2 className="main-title">
          NEW OFFERS EVERY WEEK + DISCOUNT
          <br />
          OFF FROM 20% + BEST HOT PRICES
        </h2>
        <p className="description">
          Join our subscriber list and unlock exclusive discounts, early access
          to new arrivals, and special festive offers available only to our
          community.
        </p>

        <div className="form-wrapper">
          <form className="subscription-form" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="subscription-input"
            />
            <button type="submit" className="submit-btnsww">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default SubscriptionSection;
