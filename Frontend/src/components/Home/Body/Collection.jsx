import React from 'react';
import './collection.css';
import { assets } from '../../../assets/assets'; // adjust as needed

const LuxuryCollections = () => {
  return (
    <section className="luxury-section">
      <p className="section-subtitle">OUR BEST COLLECTIONS</p>
      <h2 className="section-title">CHOOSE OUR LUXURIOUS COLLECTIONS</h2>
      <div className="section-underline" />

      <div className="collections">
        {/* Left Featured Card */}
        <div className="featured-card">
          <img src={assets.samudrika} alt="Samudrika Silk Saree" className="featured-image" />
          <div className="featured-overlay">
            <p className="featured-price">STARTING FROM ₹44,000.00</p>
            <h3 className="featured-title">
              SAMUDRIKA <span>SILK</span> SAREE
            </h3>
            <p className="featured-desc">
              Maroon floral zari design samudrika silk saree with contrast intricate zari design border & floral zari design pallu
            </p>
            <button className="btn learn">LEARN MORE</button>
          </div>
        </div>

        {/* Right Collection Items (side by side) */}
        <div className="collection-grid-horizontal">
          <div className="collection-card">
            <img src={assets.elite1} alt="Elite Silk Saree" className="collection-image" />
            <h4 className="collection-title">ELITE <span>SILK</span> SAREE</h4>
            <p className="collection-desc">Maroon checked Vasundhara elite silk saree</p>
            <p className="collection-price">₹7,500.00</p>
            <button className="btn learn">LEARN MORE</button>
          </div>

          <div className="collection-card">
            <img src={assets.parampara1} alt="Parampara Silk" className="collection-image" />
            <h4 className="collection-title">PARAMPARA <span>SILK</span></h4>
            <p className="collection-desc">Brown checked silk saree with self border of thilakam mokku</p>
            <p className="collection-price">₹8,500.00</p>
            <button className="btn learn">LEARN MORE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryCollections;
