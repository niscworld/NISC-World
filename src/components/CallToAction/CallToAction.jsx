// src/components/CallToAction/CallToAction.jsx

import React from 'react';
import './CallToAction.css';

function CallToAction() {
  return (
    <section className="cta">
      <div className="container">
        <h2 className="cta-heading">Ready to Launch with NISC World?</h2>
        <p className="cta-subtext">
          Let’s create something impactful together. We're here to help bring your ideas to life.
        </p>
        <button className="cta-btn">Get in Touch</button>
      </div>
    </section>
  );
}

export default CallToAction;
