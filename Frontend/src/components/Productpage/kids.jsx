import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './kids.css';
import { AppContext } from '../../context/AppContext';
import Header from '../Home/Navbar/Header';
import Footer from '../Home/Footer/Footer';

function KidsProductss() {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products?gender=Kids`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Failed to fetch products");
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const kidsTypes = [
    'All',
    'Frock',
    'T-Shirt',
    'Shirt',
    'Shorts',
    'Jeans',
    'Dungaree',
    'Kurta',
    'Dress'
  ];

  const availableColors = ['All', ...new Set(
    products.flatMap(product => 
      (product.variants || []).map(variant => variant.color)
    )
  )];

  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];

    const typeMatch = selectedType === 'All' || 
      product.category.toLowerCase().trim() === selectedType.toLowerCase().trim();

    const colorMatch = selectedColor === 'All' || 
      (product.variants || []).some(v => v.color === selectedColor);

    return priceInRange && typeMatch && colorMatch;
  });

  if (loading) {
    return <div className="loading">Loading kids products...</div>;
  }

  return (
    <div className="div">
      <Header />
      <div className="page-container">
      <header className="banner">
        <div className="banner-text">
          <p>NEW ARRIVALS</p>
          <h2>KIDS COLLECTION<br />FRESH AND TRENDY</h2>
          <button>EXPLORE NOW</button>
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <div className="categories">
            <h4>PRODUCT TYPES</h4>
            <ul>
              {kidsTypes.map(type => (
                <li 
                  key={type}
                  className={selectedType === type ? 'active' : ''}
                  onClick={() => setSelectedType(type)}
                >
                  {type.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h4>PRICE RANGE</h4>
            <div className="price-range">
              <span>₹{priceRange[0]}</span>
              <input 
                type="range" 
                min="0" 
                max="20000" 
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          <div className="colors">
            <h4>COLORS</h4>
            <div className="color-options">
              {availableColors.map(color => (
                <div 
                  key={color}
                  className={`color-option ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color === 'All' ? (
                    'All Colors'
                  ) : (
                    <>
                      <span 
                        className="color-swatch" 
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      {color}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="product-list">
          <div className="all-sarees-header">
            <h2>KIDS PRODUCTS</h2>
            <p>SHOWING {filteredProducts.length} RESULTS</p>
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const imgRelativePath = product.mainImage.includes('/uploads')
                  ? product.mainImage.slice(product.mainImage.indexOf('/uploads'))
                  : product.mainImage;

                return (
                  <Link to={`/product/${product._id}`} key={product._id} className="product-card">
                    <img
                      src={`${backendUrl}${imgRelativePath}`}
                      alt={product.title}
                      onError={(e) => e.target.src = '/fallback.jpg'}
                    />
                    <div className="product-details">
                      <p className="product-category">
                        {product.category.toUpperCase()} <span className="rating">★★★★★</span>
                      </p>
                      <h4 className="product-title">{product.title}</h4>
                      <p className="product-description">{product.description}</p>
                      <p className="price">₹{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="no-results">
                <p>No products match your filters</p>
                <button onClick={() => {
                  setSelectedType('All');
                  setSelectedColor('All');
                  setPriceRange([0, 20000]);
                }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default KidsProductss;
