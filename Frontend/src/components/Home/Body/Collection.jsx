import React from 'react';
import Slider from 'react-slick';
import './collection.css';
// Slick CSS from node_modules:
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// **Make sure this path matches your file structure exactly!**
// import './CollectionsSection.css';

const CollectionsSection = () => {
  const items = [
    {
      image: 'https://via.placeholder.com/600x450?text=Samudrika',
      price: '44000.00',
      title: 'SAMUDRIKA SILK SAREE',
      highlight: ['SILK'],
      description:
        'Maroon floral zari design samudrika silk saree with contrast intricate zari design border & floral zari design pallu.'
    },
    {
      image: 'https://via.placeholder.com/400x450?text=Elite',
      price: '7500.00',
      title: 'ELITE SILK SAREE',
      highlight: ['SILK'],
      description: 'Maroon checked Vasundhara elite silk saree.'
    },
    {
      image: 'https://via.placeholder.com/400x450?text=Parampara',
      price: '8500.00',
      title: 'PARAMPARA SILK',
      highlight: ['SILK'],
      description: 'Brown checked silk saree with self border of thilakam mokku.'
    }
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: dots => <div className="coll-dots"><ul>{dots}</ul></div>,
    customPaging: () => <button type="button" />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="collections-section">
      <header className="cs-header">
        <p className="cs-small">OUR BEST COLLECTIONS</p>
        <h2 className="cs-title">CHOOSE OUR LUXURIOUS COLLECTIONS</h2>
        <div className="cs-underline" />
      </header>

      <Slider {...settings}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={idx === 0 ? 'col-card col-card-large' : 'col-card col-card-small'}
          >
            {idx === 0 ? (
              <div className="large-content" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="overlay">
                  <p className="subtext">STARTING FROM ₹{item.price}</p>
                  <h3 className="large-title">
                    {item.title.split(' ').map((word, i) => (
                      <span
                        key={i}
                        className={item.highlight.includes(word) ? 'highlight' : ''}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </h3>
                  <p className="large-desc">{item.description}</p>
                  <button className="btn btn-outline">LEARN MORE</button>
                </div>
              </div>
            ) : (
              <>
                <img src={item.image} alt={item.title} />
                <h4 className="small-title">
                  {item.title.split(' ').map((word, i) => (
                    <span
                      key={i}
                      className={item.highlight.includes(word) ? 'highlight' : ''}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </h4>
                <p className="small-desc">{item.description}</p>
                <p className="small-price">₹{item.price}</p>
                <button className="btn">LEARN MORE</button>
              </>
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CollectionsSection;
