import React from 'react';
import './offer.css';

const DiscountOffer = () => {
  return (
    <div className="offer-container">
      <div className="offer-header">
        <p className="offer-subtitle">SPECIAL OFFERS</p>
        <h1 className="offer-title">50% DISCOUNT FOR LATEST TRENDS</h1>
        <div className="offer-divider"></div>
      </div>

      <div className="offer-content">
        <div className="offer-image">
          <img
            src="/images/sc4.png"
            alt="Silk Saree and Dhoti"
            className="offer-img"
          />
        </div>

        <div className="offer-details">
          <h2 className="offer-product">PURE SILK SAREE <span>+</span> SILK DHOTIS <span>+</span> FREE DELIVERY</h2>
          <p className="offer-price">BEST PRICE: <span>₹ 2,500.00</span></p>

          <div className="offer-timer">
            {[
              { label: 'DAYS', value: '20' },
              { label: 'HOURS', value: '19' },
              { label: 'MIN', value: '37' },
              { label: 'SEC', value: '08' },
            ].map((item, index) => (
              <div key={index} className="timer-circle">
                <span className="timer-value">{item.value}</span>
                <span className="timer-label">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="offer-description">
            Discover elegance at half the price! Shop our exclusive collection of premium silk dhoties and sarees now available at 50% OFF.
          </p>

          <div className="offer-buttons">
            <button className="btn learn-more">LEARN MORE</button>
            <button className="btn add-to-cart">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountOffer;
