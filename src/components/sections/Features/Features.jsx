import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { FaPencilRuler, FaLaptopCode, FaCodeBranch, FaMobileAlt } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <FaPencilRuler className="feature-icon" />,
      title: "UI/UX Designing",
      description: "Creating intuitive, visually appealing interfaces focused on user experience."
    },
    {
      icon: <FaLaptopCode className="feature-icon" />,
      title: "Web Development",
      description: "Building responsive and modern websites tailored to your goals."
    },
    {
      icon: <FaCodeBranch className="feature-icon" />,
      title: "Full Stack Development",
      description: "End-to-end solutions combining frontend and backend expertise."
    },
    {
      icon: <FaMobileAlt className="feature-icon" />,
      title: "Applications",
      description: "Crafting efficient cross-platform apps for mobile and desktop use."
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
          Solutions tailored for design, web, and application development
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
