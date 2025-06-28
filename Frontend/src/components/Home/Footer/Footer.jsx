import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG, FaPinterestP } from 'react-icons/fa';
import './Footer.css';
// import logo from '../../assets/logo.png';
// import post1 from '../../assets/post1.png';
// import post2 from '../../assets/post2.png';
// import post3 from '../../assets/post3.png';
// import amex from '../../assets/amex.png';
// import paypal from '../../assets/paypal.png';
// import mc from '../../assets/mastercard.png';
// import visa from '../../assets/visa.png';n
// const QUICK_LINKS = ['Home', 'About Us', 'Products', 'Services', 'Blog', 'Gallery', 'Contact'];
// const QUICK_LINKS_2 = ['Privacy Policy', 'Warranty', 'Login', 'Registration', 'Delivery', 'Pages', 'Our Stores'];
const TAGS = ['Silk Sarees', 'Silk Dhoties', 'Kids', 'Pure Silk', 'Kurtha', 'Ethnic', 'Skirt', 'Frocks', 'Night Wears', 'Art Silk', 'Banaras', 'Designer Saree'];

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-col about">
        {/* <img src={logo} alt="Mani Textiles" className="footer-logo" /> */}
        <p>Welcome to Mani Textiles, a trusted name in textiles and fashion based in Redhills and Gummidipoondi, Chennai.</p>
        <ul className="contact-list">
          <li><FaPhoneAlt /> CONTACT US: 9600184966</li>
          <li><FaEnvelope /> EMAIL: MANITEXTILESTHEGRANDSTORE@GMAIL.COM</li>
          <li><FaMapMarkerAlt /> ADDRESS: NO. 176/1, G.N.T ROAD, VALLIMAYIL MARKET CITY, REDHILLS, CHENNAI - 52 (OPP TO REDHILLS POLICE STATION, NEAR CSI CHURCH)</li>
        </ul>
      </div>

      <div className="footer-col links">
        <h4>Quick Links</h4>
        <ul>
          {/* {QUICK_LINKS.map(link => <li key={link}><a href="#">{link}</a></li>)} */}
        </ul>

        <h4>Quick Links</h4>
        <ul>
          {/* {QUICK_LINKS_2.map(link => <li key={link}><a href="#">{link}</a></li>)} */}
        </ul>
      </div>

      <div className="footer-col posts">
        <h4>Highlighted Posts</h4>
        <div className="post-item">
          {/* <img src={post1} alt="Post 1" /> */}
          <div>
            <span>MANI TEXTILES</span>
            <p>TRENDY DESIGNS BLENDING TRADITION WITH MODERN STYLE</p>
          </div>
        </div>
        <div className="post-item">
          {/* <img src={post2} alt="Post 2" /> */}
          <div>
            <span>MANI TEXTILES</span>
            <p>QUALITY-ASSURED PRODUCTS WITH DOORSTEP DELIVERY ACROSS INDIA</p>
          </div>
        </div>
        <div className="post-item">
          {/* <img src={post3} alt="Post 3" /> */}
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
      <p>© 2025 All rights reserved. Development by <a href="https://stayindigital.com" target="_blank" rel="noopener noreferrer">stayindigital</a></p>
      <div className="social-payments">
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaGooglePlusG /></a>
          <a href="#"><FaPinterestP /></a>
        </div>
        <div className="payment-icons">
          {/* <img src={amex} alt="American Express" />
          <img src={paypal} alt="PayPal" />
          <img src={mc} alt="MasterCard" />
          <img src={visa} alt="Visa" /> */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;