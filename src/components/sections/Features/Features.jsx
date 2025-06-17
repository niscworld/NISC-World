import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { FaCode, FaServer, FaMobileAlt, FaCloud } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <FaCode className="feature-icon" />,
      title: "Custom Development",
      description: "Tailored software solutions designed specifically for your business needs."
    },
    {
      icon: <FaServer className="feature-icon" />,
      title: "Backend Services",
      description: "Robust server architecture for high-performance applications."
    },
    {
      icon: <FaMobileAlt className="feature-icon" />,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications with native performance."
    },
    {
      icon: <FaCloud className="feature-icon" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure for growing businesses."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={`features-section ${isDarkMode ? 'dark' : 'light'}`} id="features">
      <motion.div 
        className="content-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Our <span className="highlight">Services</span>
        </motion.h2>
        
        <motion.p className="section-subtitle" variants={itemVariants}>
          Comprehensive solutions for all your tech needs
        </motion.p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`feature-card ${isDarkMode ? 'dark' : 'light'}`}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: isDarkMode 
                  ? "0 10px 25px rgba(146, 28, 93, 0.3)" 
                  : "0 10px 25px rgba(196, 35, 101, 0.2)"
              }}
            >
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;