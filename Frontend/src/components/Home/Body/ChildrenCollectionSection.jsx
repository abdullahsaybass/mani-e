import React from "react";
import "./ChildrenCollectionSection.css";
import { assets } from "../../../assets/assets";

const ChildrenCollection = () => {
  const thumbnails = [
    assets.kutchild,
    assets.kutchild,
    assets.kutchild,
  ];

  return (
    <div className="children-collection">
      <div className="children-collection__container">
        {/* Main Image */}
        <div className="children-collection__main-image-wrapper">
          <img
            src={assets.kutchild}
            alt="Children Model"
            className="children-collection__main-image"
          />
        </div>

        {/* Right Thumbnails */}
        <div className="children-collection__thumbnails">
          {thumbnails.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className="children-collection__thumbnail"
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="children-collection__content">
          <h4 className="children-collection__subheading">Modern Collection</h4>
          <h2 className="children-collection__heading">FOR CHILDRENS</h2>
          <p className="children-collection__description">
            Discover our Modern Collection for Children—a curated range of
            stylish, comfortable, and trend-forward clothing and accessories
            designed for today’s kids.
          </p>

          <div className="children-collection__features">
            <ul className="children-collection__features-list">
              <li>✔ 2000+ New Design</li>
              <li>✔ 10 lakhs parents delighted</li>
              <li>✔ 500 new style every month</li>
            </ul>
            <ul className="children-collection__features-list">
              <li>✔ 50% offer for new members</li>
              <li>✔ 125rp offer on order above 999rp</li>
              <li>✔ 24*7 customer support</li>
            </ul>
          </div>

          <div className="children-collection__actions">
            <span className="children-collection__price">BEST PRICE: ₹195.00</span>
            <div className="children-collection__btn-group">
              <button className="children-collection__btn children-collection__btn--learn">LEARN MORE</button>
              <button className="children-collection__btn children-collection__btn--cart">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenCollection;
