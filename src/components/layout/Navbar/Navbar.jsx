// src/components/layout/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png';
import './Navbar.css';
import { logout } from '../../../utils/Logout'; // ✅ Import the logout utility

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Check login status on mount & route change
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expires_at');
    if (token && expiry) {
      const now = new Date();
      const exp = new Date(expiry);
      setIsLoggedIn(exp > now);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogout = async () => {
    const result = await logout();
    setIsLoggedIn(false);
    navigate('/login'); // You can conditionally use result if needed
  };

  const navItems = [
    isLoggedIn ? { path: '/dashboard', label: 'Dashboard', } : '',
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact' },
    { path: '/internships', label: 'Internships' },
    isLoggedIn
    ? { path: '#logout', label: 'Logout', onClick: handleLogout }
    : { path: '/login', label: 'Login' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        <span className="logo-text">NISC World</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links">
        {navItems.map((item) =>
          item.onClick ? (
            <span
              key={item.label}
              onClick={item.onClick}
              className="logout-button"
              style={{ cursor: 'pointer' }}
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          )
        )}
        <button onClick={toggleTheme} className="theme-toggle">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-nav-links">
          {navItems.map((item) =>
            item.onClick ? (
              <span
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className="logout-button"
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <button onClick={toggleTheme} className="theme-toggle mobile-theme-toggle">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            {isDarkMode ? ' Light Mode' : ' Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
