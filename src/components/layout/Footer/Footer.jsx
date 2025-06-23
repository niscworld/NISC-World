import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaDiscord } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <h3 className="footer-logo">NISC World</h3>
          <p className="footer-tagline">
            Naksh Innovative Solutions Consultancy
          </p>
          <p className="footer-motto">
            "All your tech needs meet here"
          </p>
          <div className="social-links">
            <a href="https://linkedin.com/company/nisc-world" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://twitter.com/nisc-world" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com/nisc-world" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://facebook.com/nisc-world" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://discord.gg/nisc-world" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="social-icon" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a href="/services/web-development">Web Development</a></li>
            <li><a href="/services/mobile-apps">Mobile Apps</a></li>
            <li><a href="/services/cloud-solutions">Cloud Solutions</a></li>
            <li><a href="/services/ai-ml">AI/ML Services</a></li>
            <li><a href="/services/consulting">Tech Consulting</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <span>support@nisc.co.in</span>
            </div>
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span>Bengaluru, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-bar">
        <p>© {new Date().getFullYear()} NISC World. All rights reserved.</p>
        <div className="legal-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/refund-policy">Refund Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;