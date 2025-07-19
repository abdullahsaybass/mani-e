// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { assets } from '../../../assets/assets';
// import './Catergory.css';

// const PrevArrow = ({ onClick }) => (
//   <button className="arrow prev-arrow" onClick={onClick}>&larr;</button>
// );

// const NextArrow = ({ onClick }) => (
//   <button className="arrow next-arrow" onClick={onClick}>&rarr;</button>
// );

// const CategoriesSection = ({
//   categories = ['ALL', 'SILK SAREE', 'KIDS + MENS', 'CHUDIDHAR', 'KURTHI', 'COAT SUITS'],
//   items = [
//     {
//       id: 1,
//       category: 'SILK SAREE',
//       badge: 'BEST PRICE',
//       image: assets.swarovski,
//       label: 'SILK SAREES',
//       title: 'SWAROVSKI SAREE',
//       description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
//       price: '1790.00'
//     },
//       {
//       id: 2,
//       category: 'SILK SAREE',
//       badge: 'BEST PRICE',
//       image: '/images/saree1.png',
//       label: 'SILK SAREES',
//       title: 'SWAROVSKI SAREE',
//       description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
//       price: '1790.00'
//     },
//       {
//       id: 3,
//       category: 'SILK SAREE',
//       badge: 'BEST PRICE',
//       image: '/images/saree1.png',
//       label: 'SILK SAREES',
//       title: 'SWAROVSKI SAREE',
//       description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
//       price: '1790.00'
//     },
//       {
//       id: 4,
//       category: 'SILK SAREE',
//       badge: 'BEST PRICE',
//       image: '/images/saree1.png',
//       label: 'SILK SAREES',
//       title: 'SWAROVSKI SAREE',
//       description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
//       price: '1790.00'
//     },
//       {
//       id: 5,
//       category: 'SILK SAREE',
//       badge: 'BEST PRICE',
//       image: '/images/saree1.png',
//       label: 'SILK SAREES',
//       title: 'SWAROVSKI SAREE',
//       description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
//       price: '1790.00'
//     },
//     // …add at least 4–5 items here so you can slide thru
//   ]
// }) => {
//   const [activeTab, setActiveTab] = useState('ALL');
//   const filteredItems = activeTab === 'ALL'
//     ? items
//     : items.filter(i => i.category === activeTab);

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     // prevArrow: <PrevArrow />,
//     // nextArrow: <NextArrow />,
//     responsive: [
//       { breakpoint: 1200, settings: { slidesToShow: 3 } },
//       { breakpoint: 900,  settings: { slidesToShow: 2 } },
//       { breakpoint: 600,  settings: { slidesToShow: 1 } },
//     ]
//   };

//   return (
//     <section className="categories-section">
//       <header className="cs-header">
//         <p className="cs-small">NEW ARRIVALS</p>
//         <h2 className="cs-title">BROWSE OUR CATEGORIES</h2>
//         <div className="cs-underline"/>
//       </header>

//       <nav className="cs-tabs">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             className={`cs-tab ${activeTab === cat ? 'active' : ''}`}
//             onClick={() => setActiveTab(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </nav>

//       <div className="cs-carousel">
//         <Slider {...settings}>
//           {filteredItems.map(item => (
//             <div key={item.id} className="cs-card">
//               {item.badge && <span className="cs-badge">{item.badge}</span>}
//               <img src={item.image} alt={item.title} className="cs-image"/>
//               <p className="cs-label">{item.label}</p>
//               <h3 className="cs-item-title">{item.title}</h3>
//               <p className="cs-desc">{item.description}</p>
//               <p className="cs-price">₹{item.price}</p>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;

import React, { useState } from 'react';
import { assets } from '../../../assets/assets';
import './Catergory.css';

const CategoriesSection = () => {
  const categories = ['ALL', 'SILK SAREE', 'KIDS + MENS', 'CHUDIDHAR', 'KURTHI', 'COAT SUITS'];
  const [activeTab, setActiveTab] = useState('ALL');

  const allItems = [
    {
      id: 1,
      category: 'SILK SAREE',
      badge: 'BEST PRICE',
      image: assets.swarovski1,
      label: 'SILK SAREES',
      title: 'SWAROVSKI SAREE',
      description: 'Elevate your look with our elegant Silk Saree - perfect for any special occasion.',
      price: 1790,
    },
    {
      id: 2,
      category: 'FULL-SLEEVE KURTA',
      image: assets.kurta,
      label: 'FULL-SLEEVE KURTA',
      title: 'KURTA & CONTRAST PATIALA-STYLE PANTS',
      description: 'Pale orange pure silk nawabi suit features intricate jacquard design full-sleeve',
      price: 3059,
    },
    {
      id: 3,
      category: 'KIDS + MENS',
      image: assets.gownkutta1,
      label: 'KIDS WEAR',
      title: 'GOWN+KURTHA',
      description: 'Green tropical floral printed & embroidered ala-neck 3/4th sleeve gown',
      price: 3420,
    },
    {
      id: 4,
      category: 'CHUDIDHAR',
      badge: 'BEST PRICE',
      image: assets.pinkmaterial1,
      label: 'CHURIDAR',
      title: 'PINK MATERIAL CHURIDAR CATALOG SET',
      description: 'Pink material churidar catalog set, embroidered georgette top',
      price: 999,
    },
    {
      id: 5,
      category: 'DESIGNER SAREES',
      image: assets.ikkat1,
      label: 'DESIGNER SAREES',
      title: 'IKKAT DESIGN SAREE',
      description: 'Multi-colour Ikkat Tussar saree with contrast border and striped pallu—vibrant and elegant.',
      price: 2665,
    },
  ];

  const filteredItems = activeTab === 'ALL'
    ? allItems
    : allItems.filter(item => item.category === activeTab);

  return (
    <section className="categories-section">
      <header className="cs-header">
        <p className="cs-small">NEW ARRIVALS</p>
        <h2 className="cs-title">BROWSE OUR CATEGORIES</h2>
        <div className="cs-underline" />
      </header>

      <div className="cs-tabs">
        {categories.map((cat, index) => (
          <button
            key={cat}
            className={`cs-tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
            {index < categories.length - 1 && <span className="cs-divider" />}
          </button>
        ))}
      </div>

      <div className="cs-grid">
        {filteredItems.map(item => (
          <div className="cs-card" key={item.id}>
            {item.badge && <span className="cs-badge">{item.badge}</span>}
            <img src={item.image} alt={item.title} className="cs-image" />
            <p className="cs-labels">{item.label}</p>
            <h3 className="cs-titles">{item.title}</h3>
            <p className="cs-desc">{item.description}</p>
            <p className="cs-price">₹{item.price.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
