// ProductCarousel.jsx
import React, { useEffect, useState, useContext } from 'react';
import './Productcarosuel.css';
import { AppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';

export default function ProductCarousel() {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`);
        const { success, products } = await res.json();
        if (success) setProducts(products);
      } catch (err) {
        console.error('Fetch products failed:', err);
      }
    })();
  }, [backendUrl]);

  if (!products.length) {
    return <p className="loading">Loading products…</p>;
  }

  return (
    <div className="carousel-container">
      <div className="cards-wrapper">
        {products.map((p) => {
          // Extract the public /uploads/... path
          const mainImgRelative = p.mainImage.includes('/uploads')
            ? p.mainImage.slice(p.mainImage.indexOf('/uploads'))
            : p.mainImage;
          // Collect unique variant colors
          const swatchColors = (p.variants || []).map(v => v.color);

          return (
            <Link to={`/product/${p._id}`} key={p._id} className="card">
              {p.price < 1000 && (
                <div className="badge badge-gold">BEST PRICE</div>
              )}

              <div className="img-wrap">
                <img
                  src={`${backendUrl}${mainImgRelative}`}
                  alt={p.title}
                  onError={e => e.target.src = '/fallback.jpg'}
                />
              </div>

              <div className="info">
                <div className="info-row top-row">
                  <span className="category">{p.subcategory}</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                </div>

                <h3 className="title">{p.title}</h3>
                <p className="desc">{p.description}</p>

                <div className="info-row price-row">
                  <div className="price-group">
                    <span className="price">₹{p.price.toLocaleString()}</span>
                  </div>
                  <div className="swatches">
                    {swatchColors.map((c, i) => (
                      <span
                        key={i}
                        className="swatch"
                        title={c}
                        style={{
                          backgroundColor: c,
                          border: c.toLowerCase() === '#ffffff' ? '1px solid #ccc' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
