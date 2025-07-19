import React, { useState, useContext } from "react";
import {
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
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kutties" },
  { label: "Cart", href: "/cartpage" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    backendUrl,
    cart,
  } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      setUserData(null);
      setIsProfileDropdownOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
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
              <div className="profile-dropdown">
                <button
                  className="profile-icon"
                  onClick={() =>
                    setIsProfileDropdownOpen((prev) => !prev)
                  }
                >
                  <FaUserCircle />
                </button>
                {isProfileDropdownOpen && (
                  <div className="dropdown-links">
                    <Link to="/orders" onClick={() => setIsProfileDropdownOpen(false)}>My Orders</Link>
                    <Link to="/cartpage" onClick={() => setIsProfileDropdownOpen(false)}>Cart</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className="slice cart-slice"
            onClick={() => navigate("/cartpage")}
            style={{ cursor: "pointer" }}
          >
            <span className="bag-text">YOUR BAG</span>
            <FaShoppingBag />
            <span className="badge">{totalItems}</span>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="header-file">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="header-logo" />
          </Link>

          <div className="mobile-header-actions">
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

              <div className="sidebar-auth-section">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>LOGIN</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>REGISTER</Link>
                  </>
                ) : (
                  <>
                    <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
                    <Link to="/cartpage" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                )}
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
