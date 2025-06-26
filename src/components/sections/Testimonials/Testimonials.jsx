import React from 'react';
import './Testimonials.css';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import defaultAvatar from './assets/default_user.jpg'; // ✅ Import default avatar

const testimonials = [
  {
    name: "Sai Lokesh (NW25I0018)",
    role: "Intern, UI/UX Program",
    quote: "The mentorship I received at NISC helped me gain real-world experience and grow as a designer. Truly a learning-driven place.",
    avatar: ""
  },
  {
    name: "Rajveer Singh",
    role: "Owner, MedTrackPro",
    quote: "Reliable, responsive, and resourceful. NISC didn’t just deliver a product — they became an extension of our team.",
    avatar: ""
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="content-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Client <span className="highlight">Testimonials</span>
        </motion.h2>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="quote-icon top"><FaQuoteLeft /></div>
              <p className="quote">{item.quote}</p>
              <div className="quote-icon bottom"><FaQuoteRight /></div>
              <div className="user-info">
                <img 
                  src={item.avatar !== "" ? item.avatar : defaultAvatar} 
                  alt={item.name} 
                  className="avatar" 
                />
                <div>
                  <h4 className="name">{item.name}</h4>
                  <span className="role">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
