import React from 'react';
import Slider from 'react-slick';
import { assets } from '../../../assets/assets';
import './FastSellingSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { id: 1, category: 'SILK SAREES', name: 'KANCHIPURAM SILK SAREE', price: 5900.0, currency: '₹', image: assets.kanchipuram1 },
  { id: 2, category: 'GIRLS WEAR', name: 'GOWNS & FROKS', price: 1200.0, currency: '₹', image: assets.froks1 },
  { id: 3, category: 'MENS WEAR', name: 'KURTHA', price: 2400.0, oldPrice: 3200.0, currency: '₹', discount: '20% DISCOUNT', image: assets.kuta1 },
  { id: 4, category: 'BOYS WEAR', name: 'ETHNIC WEAR', price: 410.0, currency: '₹', image: assets.ethinic1 },
  { id: 5, category: 'READYMADES', name: 'ANARKALI', price: 1800.0, currency: '₹', image: assets.anarkali1 },
  { id: 6, category: 'BLOUSES', name: 'HEADPHONES CABLE BTA', price: 2.5, currency: '₹', image: assets.blouses1 },
  { id: 7, category: 'COTTON & FANCY SAREE', name: 'ANDHRA COTTON', price: 300.0, currency: '₹', image: assets.andra1 },
  { id: 8, category: 'DESIGNER SAREES', name: 'COMBO SAREES', price: 4000.0, currency: '₹', image: assets.combo1 },
  { id: 9, category: 'FANCY SAREES', name: 'BUTTER SILK SAREES', price: 3000.0, currency: '₹', image: assets.butter1 },
  { id: 10, category: 'SEMI BANARAS', name: 'SEMI BANARAS CHIFFON', price: 700.0, currency: '₹', image: assets.banaras1 },
  { id: 11, category: 'SAMUDRIKA PATTU', name: 'JACQUARD SILK SAREE', price: 95000.0, currency: '₹', image: assets.jacquard1 },
  { id: 12, category: 'PARAMPARA PATTU', name: 'GREEN EMBOSSED SILKSAREE', price: 18625.0, currency: '₹', image: assets.parampara1 },
];

const chunkArray = (array, size) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );

const FastSellingSection = () => {
  const productChunks = chunkArray(products, 6);

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="fast-selling-section">
      <div className="header-text">
        <p className="sub-title">FAST SELLING</p>
        <h2 className="main-title">CHOOSING IN ONE STYLE</h2>
        <div className="underline" />
      </div>

      {productChunks.slice(0, 2).map((chunk, index) => (
        <div key={index} className={`product-slider-wrapper ${index !== 0 ? 'with-border' : ''}`}>
          <Slider {...settings} className="product-slider">
            {chunk.map(product => (
              <div key={product.id} className="product-item">
                {product.discount && (
                  <span className="discount-badged">{product.discount}</span>
                )}
                <img src={product.image} alt={product.name} className="product-image" />
                <p className="category-label">{product.category}</p>
                <p className="product-name">{product.name}</p>
                <p className="price">
                  <span className="current-price">
                    {product.currency}{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="old-price">
                      {product.currency}{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      ))}

      <div className="footer-button">
        <button className="view-all-btn">VIEW ALL FAST SELLING</button>
      </div>
    </section>
  );
};

export default FastSellingSection;
