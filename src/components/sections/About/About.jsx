// src/pages/About/AboutUs.jsx
import React from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="content-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="highlight">Us</span>
        </motion.h2>

        <motion.p 
          className="intro-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Naksh Innovative Solutions Consultancy (NISC) was born from a deep passion to redefine the tech consulting experience. With a foundation rooted in empathy, ethics, and engineering excellence, we believe in building not just software — but long-term impact.
        </motion.p>

        <motion.div 
          className="vision-mission"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="card">
            <h3 className="card-title">Our Mission</h3>
            <p>
              To empower businesses with future-ready digital solutions built with integrity, innovation, and deep user understanding.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">Our Vision</h3>
            <p>
              To become a globally respected digital powerhouse, delivering scalable and ethical technology that drives meaningful change.
            </p>
          </div>
        </motion.div>
<div className="founder-messages">

  {/* Founder Message */}
  <motion.div 
    className="founder-message"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
    <h3>From Our Founder</h3>
    <p>
      "NISC was born out of a belief — that with the right vision and heart, we can transform lives through technology. Our roots are personal, our mission is global."
    </p>
    <span className="signature">— P Rushvitha Devi, Founder & Owner</span>
  </motion.div>

  {/* Co-founder Message */}
  <motion.div 
    className="founder-message"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.6 }}
  >
    <h3>From Our CEO</h3>
    <p>
      "NISC isn’t just a company. It’s a reflection of a promise — that no client, no idea, and no vision goes unheard. We are here to prove that with empathy, precision, and strategy — dreams can scale to big."
    </p>
    <span className="signature">— K Srinivas Charan, Co-founder & CEO</span>
  </motion.div>

  {/* Rekash */}
  <motion.div 
    className="founder-message"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <h3>From Our Development Head</h3>
    <p>
      "Tech is only as powerful as the clarity behind it. At NISC, I ensure our code solves real problems — not just technical ones, but human ones."
    </p>
    <span className="signature">— N Rekash, Director of Development</span>
  </motion.div>

  {/* Mourya */}
  <motion.div 
    className="founder-message"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.6 }}
  >
    <h3>From Our Marketing Lead</h3>
    <p>
      "Every brand has a heartbeat. I make sure NISC's pulse is heard loud, clear, and authentically — wherever our story travels."
    </p>
    <span className="signature">— P Mourya, Director of Marketing</span>
  </motion.div>

  {/* Gowtham */}
  <motion.div 
    className="founder-message"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6 }}
  >
    <h3>From Our Financial Strategist</h3>
    <p>
      "Behind every sustainable business is a financial brain. I ensure NISC's future is not just bright, but also balanced and secure."
    </p>
    <span className="signature">— V Gowtham, Director of Financial Strategies</span>
  </motion.div>

  {/* Mohoseen */}
  <motion.div 
    className="founder-message"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4, duration: 0.6 }}
  >
    <h3>From Our Design Visionary</h3>
    <p>
      "Design isn't decoration — it's communication. At NISC, I craft every visual element to reflect our empathy, clarity, and purpose."
    </p>
    <span className="signature">— SK Mohoseen, Director of Design</span>
  </motion.div>

</div>
      </div>
    </section>
  );
};

export default AboutUs;
