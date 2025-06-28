import React from 'react';
import Slider from 'react-slick';

import './FastSellingSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { id: 1,  category: 'SILK SAREES',            name: 'KANCHIPURAM SILK SAREE',      price: 5900.00, currency: '₹', image: '/images/silk-saree.jpg' },
  { id: 2,  category: 'GIRLS WEAR',             name: 'GOWNS & FROKS',              price: 1200.00, currency: '₹', image: '/images/gown-frok.jpg' },
  { id: 3,  category: 'MENS WEAR',              name: 'KURTHA',                     price: 2400.00, oldPrice: 3200.00, currency: '₹', discount: '20% DISCOUNT', image: '/images/kurtha.jpg' },
  { id: 4,  category: 'BOYS WEAR',              name: 'ETHNIC WEAR',                price: 410.00,  currency: '₹', image: '/images/boys-ethnic.jpg' },
  { id: 5,  category: 'READYMADES',             name: 'ANARKALI',                   price: 1800.00, currency: '₹', image: '/images/anarkali.jpg' },
  { id: 6,  category: 'BLOUSES',                name: 'HEADPHONES CABLE BTA',       price: 2.50,    currency: '₹', image: '/images/blouse.jpg' },
  { id: 7,  category: 'COTTON & FANCY SAREE',   name: 'ANDHRA COTTON',              price: 300.00,  currency: '₹', image: '/images/andhra-cotton.jpg' },
  { id: 8,  category: 'DESIGNER SAREES',        name: 'COMBO SAREES',               price: 4000.00, currency: '₹', image: '/images/combo-sarees.jpg' },
  { id: 9,  category: 'FANCY SAREES',           name: 'BUTTER SILK SAREES',         price: 3000.00, currency: '₹', image: '/images/butter-silk.jpg' },
  { id: 10, category: 'SEMI BANARAS',           name: 'SEMI BANARAS CHIFFON',       price: 700.00,  currency: '₹', image: '/images/semi-banaras.jpg' },
  { id: 11, category: 'SAMUDRIKA PATTU',        name: 'JACQUARD SILK SAREE',        price: 95000.00,currency: '₹', image: '/images/jacquard-silk.jpg' },
  { id: 12, category: 'PARAMPARA PATTU',        name: 'GREEN EMBOSSED SILKSAREE',   price: 18625.00,currency: '₹', image: '/images/parampara-pattu.jpg' },
];

const FastSellingSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="fast-selling-section">
      <div className="header-text">
        <p className="sub-title">FAST SELLING</p>
        <h2 className="main-title">CHOOSING IN ONE STYLE</h2>
        <div className="underline" />
      </div>

      <Slider {...settings} className="product-slider">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {product.discount && (
              <span className="discount-badge">{product.discount}</span>
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

      <div className="footer-button">
        <button className="view-all-btn">VIEW ALL FAST SELLING</button>
      </div>
    </section>
  );
};

export default FastSellingSection;
