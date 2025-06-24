import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png';
import './Navbar.css';
import API from '../../../api/MainApi'; // ✅ Add API import
import { logout } from '../../../utils/Logout';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isServerOn, setIsServerOn] = useState(null); // ✅ Track server status
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

  useEffect(() => {
  checkServerStatus(); // ✅ Initial check on component mount

}, []);


  // ✅ Check if server is on
  const checkServerStatus = async () => {
    try {
      const response = await fetch(API.IS_SERVER_ON);
      const result = await response.json();
      setIsServerOn(result?.success || false); // assume API returns { success: true }
      setTimeout(checkServerStatus, 10 * 60 * 1000);
    } catch (err) {
      console.error('Server check failed:', err);
      setIsServerOn(false);
      setTimeout(checkServerStatus, 2 * 60 * 1000);
    }
  };

  useEffect(() => {
    checkServerStatus(); // ✅ Call on mount
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navItems = [
    isLoggedIn ? { path: '/dashboard', label: 'Dashboard' } : '',
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
        <span className="logo-text">
          NISC World
        </span>
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
      <span className="server-status">
        {isServerOn === null ? '🔵' : isServerOn ? '🟢' : '🔴'}
      </span>
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
