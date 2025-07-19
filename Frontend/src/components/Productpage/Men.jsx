import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Men.css';
import { AppContext } from '../../context/AppContext';

function Menproduct() {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products?gender=Male`);
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

  const menCategories = [
    'All',
    'Shirt',
    'Tshirt',
    'Pant',
    'Sleeveless',
    'Others'
  ];

  const availableColors = ['All', ...new Set(
    products.flatMap(product => 
      (product.variants || []).map(variant => variant.color)
    )
  )];

  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];

    const categoryMatch = selectedCategory === 'All' || 
      product.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

    const colorMatch = selectedColor === 'All' || 
      (product.variants || []).some(v => v.color === selectedColor);

    return priceInRange && categoryMatch && colorMatch;
  });

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="page-container">
      <header className="banner">
        <div className="banner-text">
          <p>MEN'S COLLECTION</p>
          <h2>UP TO 50% OFF<br />TRENDY MEN'S WEAR</h2>
          <button>EXPLORE NOW</button>
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <div className="categories">
            <h4>MEN'S CATEGORIES</h4>
            <ul>
              {menCategories.map(type => (
                <li 
                  key={type}
                  className={selectedCategory === type ? 'active' : ''}
                  onClick={() => setSelectedCategory(type)}
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
          <div className="all-products-header">
            <h2>MEN'S PRODUCTS</h2>
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
                  setSelectedCategory('All');
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
  );
}

export default Menproduct;
