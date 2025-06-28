import React from 'react';
import './exclusive.css';
import { assets } from '../../../assets/assets';

const Exclusive = () => {
  return (
    <div className="saree-showcase">
      <div className="saree-card">
        <div className="saree-content">
          <p className="saree-subtitle">MANI TEXTILES</p>
          <h2 className="saree-title">EXCLUSIVE SAREE COLLECTIONS</h2>
          <div className="saree-divider"></div>
          <p className="saree-description">
            “Elegant, Sophisticated and Enchanting” is what we believe to be the perfect saree.
          </p>
          <button className="saree-button">LEARN MORE</button>
        </div>
        <img
          src={assets.esaree1}
          alt="Exclusive Saree"
          className="saree-img"
        />
        <div className="saree-overlay" />
      </div>

      <div className="saree-card">
        <div className="saree-content">
          <p className="saree-subtitle">MANI TEXTILES</p>
          <h2 className="saree-title">DESIGNER COLLECTIONS</h2>
          <div className="saree-divider"></div>
          <p className="saree-description">
            We offer a blend of rich heritage, intricate designs, and top-notch silk sarees that cater to the diverse tastes of saree lovers.
          </p>
          <button className="saree-button">LEARN MORE</button>
        </div>
        <img
          src={assets.esaree2}
          alt="Designer Saree"
          className="saree-img"
        />
        <div className="saree-overlay" />
      </div>
    </div>
  );
};

export default Exclusive;
