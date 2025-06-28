// Hero.jsx
import React from 'react';
import './Hero.css';
import { assets } from '../../../assets/assets';

const sareeData = [
  {
    title: "BORDER SILK SAREE",
    description: "Elevate your ethnic wardrobe with our stunning Silk Saree, a timeless addition for your special occasions.",
    features: [
      "Crafted from luxurious Silk fabric",
      "This 6.3-meter saree drapes elegantly",
      "Offering comfort and grace"
    ],
    price: "₹1795.00",
    img: assets.header1,
  }
];

const Hero = () => {
  const item = sareeData[0];
  return (
    <div className="saree-slider-section">
      <img
        src={assets.background}
        alt="background"
        className="rotated-background"
      />

      <div className="saree-slide">
        <div className="saree-container">
          <div className="saree-text">
            <p className="edition">Mani Textile New Edition</p>
            <h1 className="titles">{item.title}</h1>
            <div className="divider"></div>
            <p className="description">{item.description}</p>
            <ul className="features">
              {item.features.map((feat, i) => (
                <li key={i}>✔ {feat}</li>
              ))}
            </ul>
            <div className="buttons">
              <p className="price">BEST PRICE: {item.price}</p>
              <button className="btn white">LEARN MORE</button>
              <button className="btn black">ADD TO CART</button>
            </div>
          </div>
          <div className="saree-image">
            <img src={item.img} alt={item.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;