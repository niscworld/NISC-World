// src/hooks/AnimatedTechLines.jsx
import React from 'react';
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCode,
  MdComputer,
  MdWifi,
  MdSecurity
} from 'react-icons/md';
import './AnimatedTechLines.css';

const AnimatedTechLines = () => {
  return (
    <div className="tech-animated-background">
      {/* Floating Sparks */}
      {[...Array(12)].map((_, i) => (
        <div key={`spark-${i}`} className={`tech-spark spark-${i}`} />
      ))}

      {/* Rotating Tech Circles */}
      {[...Array(4)].map((_, i) => (
        <div key={`circle-${i}`} className={`tech-circle circle-${i}`} >O</div>
      ))}


      {/* Floating Tech Symbols */}
      <div className="tech-symbol symbol-1"><MdEmail /></div>
      <div className="tech-symbol symbol-2"><MdPhone /></div>
      <div className="tech-symbol symbol-3"><MdLocationOn /></div>
      <div className="tech-symbol symbol-4"><MdCode /></div>
      <div className="tech-symbol symbol-5"><MdComputer /></div>
      <div className="tech-symbol symbol-6"><MdWifi /></div>
      <div className="tech-symbol symbol-7"><MdSecurity /></div>
      <div className="tech-symbol symbol-8">&lt;/&gt;</div>
    </div>
  );
};

export default AnimatedTechLines;
