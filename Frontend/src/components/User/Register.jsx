// src/components/User/RegisterForm.jsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import Header from '../Home/Navbar/Header';
import Footer from '../Home/Footer/Footer';
import { FcGoogle } from 'react-icons/fc';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      // 1. Register
      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',           // << important for cookies
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok || data.success === 'false') {
        throw new Error(data.message || "Registration failed");
      }
      toast.success("Registered! Logging you in...");

      // 2. Check authentication and load user
      const authRes = await fetch(`${backendUrl}/api/auth/authenticated`, {
        method: 'POST',
        credentials: 'include'
      });
      const authData = await authRes.json();
      if (authData.success) {
        setIsLoggedIn(true);
        setUserData(authData.user);
      }

      // 3. Redirect to homepage
      navigate('/');
    } catch (err) {
      console.error("Register error:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-section">
      <Header />
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">REGISTER</h2>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                className="register-input"
              />
            </div>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Your email"
                className="register-input"
              />
            </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                className="register-input"
              />
            </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Repeat password"
                className="register-input"
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Submitting…' : 'SUBMIT'}
            </button>
          </form>

          <div className="divider round"><span>OR</span></div>

          <div className="social-buttons">
            <button className="social-btn facebook">
              <BiLogoFacebookCircle className="icon" />
              <span>Facebook</span>
            </button>
            <button className="social-btn google">
              <FcGoogle className="icon" />
              <span>Google</span>
            </button>
          </div>

          <p className="login-text">
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  );
};

export default RegisterForm;
