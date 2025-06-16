// src/components/Features/Features.jsx

import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      title: 'Modern Design',
      description: 'Clean, responsive layouts that look great on all devices.',
    },
    {
      title: 'Scalable Architecture',
      description: 'Built with React for modular, future-ready applications.',
    },
    {
      title: 'Fast Deployment',
      description: 'Optimized for performance and quick go-to-market launches.',
    },
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="features-heading">What We Offer</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
