// src/components/layout/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png'
import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    // { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        <span className="logo-text">NISC World</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
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
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
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