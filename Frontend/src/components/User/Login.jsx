// src/components/User/LoginForm.jsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FiMail, FiLock } from 'react-icons/fi';
import Header from '../Home/Navbar/Header';
import Footer from '../Home/Footer/Footer';
import { AppContext } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    setLoading(true);
    try {
      // 1. login request
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || data.success === 'false') {
        throw new Error(data.message || "Login failed");
      }
      toast.success("Login successful!");

      // 2. fetch authenticated user
      const authRes = await fetch(`${backendUrl}/api/auth/authenticated`, {
        method: 'POST',
        credentials: 'include',
      });
      const authData = await authRes.json();
      if (authData.success) {
        setIsLoggedIn(true);
        setUserData(authData.user);
      }

      // 3. redirect home
      navigate('/');
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />

      <div className="form-container">
        <div className="login-box">
          <h2 className="login-title">LOGIN</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Your email"
                className="login-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Enter password"
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="login-forgot">
              <Link to="/forgot-password" className="link">
                FORGOT PASSWORD?
              </Link>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Logging in…' : 'LOGIN'}
            </button>

            <div className="login-register">
              <span>Don't have an account?</span>
              <Link to="/register" className="link register-link">
                REGISTER NOW
              </Link>
            </div>
          </form>

          <div className="divider"><span>OR</span></div>

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
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
