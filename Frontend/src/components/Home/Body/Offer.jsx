import React from 'react';
import './offer.css';
import { assets } from '../../../assets/assets'; // adjust based on your structure

const OfferBannerSection = () => {
  return (
    <section className="offer-section">
      <div className="offer-header">
        <p className="offer-sub">SPECIAL OFFERS</p>
        <h2 className="offer-title">50% DISCOUNT FOR LATEST TRENDS</h2>
        <div className="underline" />
      </div>

      <div className="offer-content">
        <div className="offer-left">
          <img
            src={assets.discount}
            alt="Offer Banner"
            className="offer-img"
          />
          <img
            src={assets.discount1}
            alt="Overlay"
            className="overlay-image"
          />
        </div>

        <div className="offer-right">
          <h3 className="product-title">
            PURE SILK SAREE <span className="plus">+</span> SILK DHOTIS <span className="plus">+</span> FREE DELIVERY
          </h3>

          <p className="price">
            BEST PRICE: <span>₹ 2,500.00</span>
          </p>

          <div className="countdown">
            <div className="count-item">
              <span className="count">20</span>
              <span className="label">DAYS</span>
            </div>
            <div className="count-item">
              <span className="count">19</span>
              <span className="label">HOURS</span>
            </div>
            <div className="count-item">
              <span className="count">37</span>
              <span className="label">MIN</span>
            </div>
            <div className="count-item">
              <span className="count">08</span>
              <span className="label">SEC</span>
            </div>
          </div>

          <p className="offer-desc">
            Discover elegance at half the price! Shop our exclusive collection of premium silk dhotis and sarees now available at 50% OFF.
          </p>

          <div className="offer-buttons">
            <button className="btn learn">LEARN MORE</button>
            <button className="btn cart">ADD TO CART</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBannerSection;
