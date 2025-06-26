import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaTag,
} from 'react-icons/fa';
import { SiThreads } from 'react-icons/si'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import './Footer.css';
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>

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

          {/* Updated Social Links */}
          <div className="social-links">
            <a href="https://linkedin.com/in/nisc-world" target="_blank" rel="noopener noreferrer" style={{ display: "none"}}>
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://x.com/NiscWorld" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.threads.com/@niscworld" target="_blank" rel="noopener noreferrer">
              <SiThreads className="social-icon" />
            </a>
            <a href="https://www.instagram.com/niscworld?igsh=MXhmZHdnZndzYmNpeA==" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://www.facebook.com/niscworld?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://youtube.com/@niscworld?si=zcyRoe1qrihvZ79e" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="social-icon" />
            </a>
            <a href="https://whatsapp.com/channel/0029VakcEtB5Ejy6sgVAKc0K" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon" title="WhatsApp Channel (used Discord icon as placeholder)" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            {/* <li><a href="/about">About Us</a></li> */}
            <li><a href="#projects">Projects</a></li>
            {/* <li><a href="/blog">Blog</a></li> */}
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-column" style={{ display: "none" }}>
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
              <span>nisc.co.in@gmail.com</span>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" />
              <span>(+91) 8897 468 745</span>
            </div>
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span>Tirupathi, India</span>
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
