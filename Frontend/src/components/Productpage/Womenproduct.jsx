import React from 'react';
import './Womenproduct.css';
import { products } from '../../assets/assets.js';
import { Link } from 'react-router-dom';

function Womenproduct() {
  return (
    <div className="page-container">
      <header className="banner">
        <div className="banner-text">
          <p>DON'T MISS</p>
          <h2>UP TO 70%<br />BEST SILK SAREES</h2>
          <button>LEARN MORE</button>
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <div className="categories">
            <h4>CATEGORIES</h4>
            <ul>
              <li>SHORT COTTON SAREES</li>
              <li>SHOP DESIGNER SAREES</li>
              <li>ART SILK & FANCY SAREES</li>
              <li>SEMI BANARASI</li>
              <li className="active">ALL SAREES</li>
              <li>SAREE BLOUSE DESIGNS</li>
              <li>HALF SAREES</li>
              <li>RECOMMENDED</li>
              <li>WOMEN WEAR</li>
              <li>BOYS WEAR</li>
            </ul>
          </div>

          <div className="filter-section">
            <h4>PRICE</h4>
            <input type="range" min="0" max="20000" />
          </div>

          <div className="brands">
            <h4>SHOP BY BRANDS</h4>
            <ul>
              <li><input type="checkbox" /> Brand 1</li>
              <li><input type="checkbox" /> Brand 2</li>
              <li><input type="checkbox" /> Brand 3</li>
            </ul>
          </div>

          <div className="colors">
            <h4>CHOOSE COLOR</h4>
            <div className="color-boxes">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`color color-${i}`} />
              ))}
            </div>
          </div>

          <div className="new-arrivals">
            <h4>NEW ARRIVALS</h4>
            <ul>
              <li>MEN'S WEAR</li>
              <li>WOMEN</li>
              <li>PURPLE</li>
              <li>HALF SAREES</li>
            </ul>
          </div>

          <div className="tags">
            <h4>POPULAR TAGS</h4>
            <div className="tag-list">
              {['SILK SAREES', 'KIDS', 'HANDBAG', 'COCKTAIL SAREE'].map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </aside>

        <main className="product-list">
          <div className="all-sarees-header">
            <h2>ALL SAREES</h2>
            <p>SHOWING {products.length} RESULTS</p>

            <div className="view-filters">
              <button className="active">
                <img src="https://img.icons8.com/material-sharp/20/ffffff/squared-menu.png" alt="Grid" />
              </button>
              <button>
                <img src="https://img.icons8.com/material-outlined/20/000000/squared-menu.png" alt="List" />
              </button>

              <select>
                <option>MOST POPULAR PRODUCTS</option>
                <option>PRICE: HIGH TO LOW</option>
                <option>PRICE: LOW TO HIGH</option>
              </select>

              <select>
                <option>SHOW 30</option>
                <option>SHOW 60</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {products.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="product-card">
                <img src={item.image} alt={item.title} />
                <p className="product-category">SAREES</p>
                <h4>{item.title}</h4>
                <p className="price">₹{item.price.toLocaleString()}</p>
                <p className="description">{item.description}</p>
              </Link>
            ))}
          </div>

          <div className="pagination">
            <button>PREV PAGE</button>
            {[1, 2, 3].map(n => (
              <button key={n}>{n}</button>
            ))}
            <button>NEXT PAGE</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Womenproduct;
