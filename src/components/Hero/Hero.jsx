// src/components/Hero/Hero.jsx

import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content container">
        <h1 className="hero-title">Welcome to NISC World</h1>
        <p className="hero-subtitle">
          A digital launchpad to build your brand identity.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
