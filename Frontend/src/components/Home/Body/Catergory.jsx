import React, { useState } from 'react';
import Slider from 'react-slick';

// IMPORTANT: these must point to your node_modules slick CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// And this must point to the CSS file you create next:
import './Catergory.css';

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev-arrow" onClick={onClick}>&larr;</button>
);

const NextArrow = ({ onClick }) => (
  <button className="arrow next-arrow" onClick={onClick}>&rarr;</button>
);

const CategoriesSection = ({
  categories = ['ALL', 'SILK SAREE', 'KIDS + MENS', 'CHUDIDHAR', 'KURTHI', 'COAT SUITS'],
  items = [
    {
      id: 1,
      category: 'SILK SAREE',
      badge: 'BEST PRICE',
      image: '/images/saree1.png',
      label: 'SILK SAREES',
      title: 'SWAROVSKI SAREE',
      description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
      price: '1790.00'
    },
      {
      id: 2,
      category: 'SILK SAREE',
      badge: 'BEST PRICE',
      image: '/images/saree1.png',
      label: 'SILK SAREES',
      title: 'SWAROVSKI SAREE',
      description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
      price: '1790.00'
    },
      {
      id: 3,
      category: 'SILK SAREE',
      badge: 'BEST PRICE',
      image: '/images/saree1.png',
      label: 'SILK SAREES',
      title: 'SWAROVSKI SAREE',
      description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
      price: '1790.00'
    },
      {
      id: 4,
      category: 'SILK SAREE',
      badge: 'BEST PRICE',
      image: '/images/saree1.png',
      label: 'SILK SAREES',
      title: 'SWAROVSKI SAREE',
      description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
      price: '1790.00'
    },
      {
      id: 5,
      category: 'SILK SAREE',
      badge: 'BEST PRICE',
      image: '/images/saree1.png',
      label: 'SILK SAREES',
      title: 'SWAROVSKI SAREE',
      description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
      price: '1790.00'
    },
    // …add at least 4–5 items here so you can slide thru
  ]
}) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const filteredItems = activeTab === 'ALL'
    ? items
    : items.filter(i => i.category === activeTab);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900,  settings: { slidesToShow: 2 } },
      { breakpoint: 600,  settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <section className="categories-section">
      <header className="cs-header">
        <p className="cs-small">NEW ARRIVALS</p>
        <h2 className="cs-title">BROWSE OUR CATEGORIES</h2>
        <div className="cs-underline"/>
      </header>

      <nav className="cs-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cs-tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="cs-carousel">
        <Slider {...settings}>
          {filteredItems.map(item => (
            <div key={item.id} className="cs-card">
              {item.badge && <span className="cs-badge">{item.badge}</span>}
              <img src={item.image} alt={item.title} className="cs-image"/>
              <p className="cs-label">{item.label}</p>
              <h3 className="cs-item-title">{item.title}</h3>
              <p className="cs-desc">{item.description}</p>
              <p className="cs-price">₹{item.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoriesSection;
