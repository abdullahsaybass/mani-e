import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
  FaPinterestP,
} from 'react-icons/fa';
import './Footer.css';

const QUICK_LINKS_1 = [
  { label: 'Home', path: '/' },
  { label: 'Register', path: '/register' },
  { label: 'Login', path: '/login' },
  { label: 'Cart', path: '/cartpage' },
  { label: 'Contact', path: '/contact' },
];

const QUICK_LINKS_2 = [
  { label: 'Women', path: '/women' },
  { label: 'Track Order', path: '/trackorder' },
  { label: 'Product Page', path: '/product/1' },
  { label: 'Buy Now', path: '/buy-now' },
];

const TAGS = ['Silk Sarees', 'Silk Dhoties', 'Kids', 'Pure Silk', 'Kurtha', 'Ethnic', 'Skirt', 'Frocks', 'Night Wears', 'Art Silk', 'Banaras', 'Designer Saree'];

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-col about">
        <p>Welcome to Mani Textiles, a trusted name in textiles and fashion based in Redhills and Gummidipoondi, Chennai.</p>
        <ul className="contact-list">
          <li><FaPhoneAlt /> CONTACT US: 9600184966</li>
          <li><FaEnvelope /> EMAIL: MANITEXTILESTHEGRANDSTORE@GMAIL.COM</li>
          <li><FaMapMarkerAlt /> ADDRESS: NO. 176/1, G.N.T ROAD, VALLIMAYIL MARKET CITY, REDHILLS, CHENNAI - 52 (OPP TO REDHILLS POLICE STATION, NEAR CSI CHURCH)</li>
        </ul>
      </div>

      <div className="footer-col links">
        <div className="links-wrapper">
          <div>
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS_1.map(link => <li key={link.label}><a href={link.path}>{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4>More Links</h4>
            <ul>
              {QUICK_LINKS_2.map(link => <li key={link.label}><a href={link.path}>{link.label}</a></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-col posts">
        <h4>Highlighted Posts</h4>
        <div className="post-item">
          <div>
            <span>MANI TEXTILES</span>
            <p>TRENDY DESIGNS BLENDING TRADITION WITH MODERN STYLE</p>
          </div>
        </div>
        <div className="post-item">
          <div>
            <span>MANI TEXTILES</span>
            <p>QUALITY-ASSURED PRODUCTS WITH DOORSTEP DELIVERY ACROSS INDIA</p>
          </div>
        </div>
        <div className="post-item">
          <div>
            <span>MANI TEXTILES</span>
            <p>BREATHABLE MULMUL COTTON OUTFITS, PERFECT FOR EVERYDAY COMFORT</p>
          </div>
        </div>
      </div>

      <div className="footer-col tags">
        <h4>Popular Tags</h4>
        <div className="tag-list">
          {TAGS.map(tag => (
            <a key={tag} href="#" className={tag === 'Silk Sarees' ? 'active' : ''}>{tag}</a>
          ))}
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 All rights reserved. Development by <a href="/#" target="_blank" rel="noopener noreferrer">Mani-Textile</a></p>
      <div className="social-payments">
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaGooglePlusG /></a>
          <a href="#"><FaPinterestP /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;