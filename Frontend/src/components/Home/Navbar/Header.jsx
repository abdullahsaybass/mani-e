import React, { useState, useContext } from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { AppContext } from "../../../context/AppContext";
import "./Header.css";

const MENU = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    subMenu: [
      { label: "Men", href: "/products/men" },
      { label: "Women", href: "/products/women" },
      { label: "Kids", href: "/products/kids" },
    ],
  },
  { label: "Track Order", href: "/trackorder" },
  { label: "Cart", href: "/cartpage" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const Header = () => {
  const { isLoggedIn, logout, cart } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const totalPrice = cart?.items?.reduce(
    (sum, i) => sum + i.quantity * (i.product?.price || 0),
    0
  ) || 0;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="header">
      <div className="top-bar">
        <div className="left-section">
          <div className="slice contact-slice">
            <span>CONTACT US: 9600184966</span>
          </div>
          <div className="slice email-slice">
            <span>EMAIL: MANITEXTILESTHEGRANDSTORE@GMAIL.COM</span>
          </div>
        </div>
        <div className="right-section">
          <div className="slice login-slice desktop-only">
            {!isLoggedIn ? (
              <>
                <Link to="/login">LOGIN</Link>
                <span className="or">OR</span>
                <Link to="/register">REGISTER</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="profile-icon">
                  <FaUserCircle />
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
          <div className="icon-slice">
            <FaHeart />
          </div>
          <div
            className="slice cart-slice"
            onClick={() => navigate("/cartpage")}
            style={{ cursor: 'pointer' }}
          >
            <span className="bag-text">YOUR BAG</span>
            <FaShoppingBag />
            <span className="badge">{totalItems}</span>
            <span className="price">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="header-file">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="header-logo" />
          </Link>

          <div className="mobile-header-actions">
            {!isMobileMenuOpen && (
              !isLoggedIn ? (
                <Link className="mobile-login-btn" to="/login">
                  LOGIN
                </Link>
              ) : (
                <>
                  <Link to="/profile" className="mobile-profile-icon">
                    <FaUserCircle />
                  </Link>
                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )
            )}

            {isMobileMenuOpen ? (
              <FaTimes
                className="hamburger-icon close-icon"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="hamburger-icon"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            )}

            <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
              <div className="drawer-header">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img
                    src={assets.logo}
                    alt="Logo"
                    className="drawer-logo"
                    style={{ height: "40px", marginBottom: "10px" }}
                  />
                </Link>
              </div>
              {MENU.map((item, idx) => (
                <div key={idx}>
                  <Link
                    to={item.href}
                    className={idx === activeIndex ? "active" : ""}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="header-menu">
            <FaBars
              className="hamburger-icon"
              onClick={() => setIsMobileMenuOpen(true)}
            />
            <nav className="nav-links desktop-nav">
              {MENU.map((item, idx) => (
                <div
                  key={idx}
                  className={`nav-item ${item.subMenu ? "has-dropdown" : ""}`}
                  onMouseEnter={() => item.subMenu && setActiveIndex(idx)}
                  onMouseLeave={() => item.subMenu && setActiveIndex(null)}
                >
                  <Link
                    to={item.href}
                    className={idx === activeIndex ? "active" : ""}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subMenu && activeIndex === idx && (
                    <div className="dropdown-menu">
                      {item.subMenu.map((sub, subIdx) => (
                        <Link
                          key={subIdx}
                          to={sub.href}
                          className="dropdown-item"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
