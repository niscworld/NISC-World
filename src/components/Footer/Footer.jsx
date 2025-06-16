// src/components/Footer/Footer.jsx

import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-text">© {new Date().getFullYear()} NISC World. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
