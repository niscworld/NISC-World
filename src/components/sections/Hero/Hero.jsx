import React, { useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { Link } from 'react-router-dom';
import './Hero.css';
import { FaArrowRight, FaLaptop, FaMobile, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import banner from "./assets/banner.jpg";

const Hero = () => {
  const { isDarkMode } = useTheme();

  // Device animation variants
  const deviceVariants = {
    laptop: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    mobile: {
      y: [0, 20, 0],
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    },
    server: {
        y: [0, -10, 0],
        rotate: [0, 10, -10, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  return (
    <section className={`hero ${isDarkMode ? 'dark' : 'light'}`} id="hero">
      {/* Animated Tech Background Elements */}
      <div className="circuit-lines"></div>
      
      <motion.div 
        className="floating-device laptop"
        variants={deviceVariants}
        animate="laptop"
      >
        <FaLaptop />
      </motion.div>
      
      <motion.div 
        className="floating-device mobile"
        variants={deviceVariants}
        animate="mobile"
      >
        <FaMobile />
      </motion.div>
      
      <motion.div 
        className="floating-device server"
        variants={deviceVariants}
        animate="server"
      >
        <FaServer />
      </motion.div>


      {/* Content */}
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
      <div className="banner" style={{ width: "100%" }}>
        <img src={banner} alt="" style={{ width: "100%" }} />
      </div>
          <span className="gradient-text">NISC World</span>
          <br />
          <motion.h2 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Naksh Innovative Solutions Consultancy
          </motion.h2>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          "DREAM. DEVELOP. DEFINE."
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >

          <Link key="/internships" to="/internships" > Internships </Link> <FaArrowRight className="arrow-icon" />
          
          </motion.button>
          <motion.button 
            className="secondary-button"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: isDarkMode ? 'var(--bright-pink)' : 'var(--bright-pink)',
              color: 'white'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link key="/contact" to="/contact" > Contact Us </Link>
          </motion.button>
        </motion.div>
      </div>

      <motion.div hidden
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="mouse"></div>
      </motion.div>
    </section>
  );
};

export default Hero;