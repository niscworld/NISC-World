import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import defaultImage from './assets/default-project.jpg'; 
import MedTrackProImage from "./assets/MedTrackPro.png";
import CureConnectImage from "./assets/CureConnect.png";
import AquaRushImage from "./assets/AquaRush.png";

import './ProjectsPreview.css';

// Project data
const projects = [
  {
    title: "Aqua Rush",
    description: "A digital platform for water delivery management with real-time tracking and deliver to door step.",
    tags: ["React", "MongoDB", "Maps", "Python"],
    link: "#",
    image: AquaRushImage
  },
  {
    title: "Cure Connect",
    description: "Online booking system for medical appointments with doctor scheduling and reminders.",
    tags: ["Flask", "Postgre", "Google Calenders", "React"],
    link: "#",
    image: CureConnectImage
  },
  {
    title: "MedTrackPro",
    description: "Inventory management system for pharmacies with bill generation and stock alerts.",
    tags: ["React", "Python", "Postgre"],
    link: "#",
    image: MedTrackProImage
  }
];

const ProjectsPreview = () => {
  const { isDarkMode } = useTheme();

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
    hidden: { y: 50, opacity: 0 },
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
    <section className={`projects-section ${isDarkMode ? 'dark' : 'light'}`} id="projects">
      <div className="content-container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Our <span className="highlight">Projects</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Delivering innovative solutions across industries
          </motion.p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={`project-card ${isDarkMode ? 'dark' : 'light'}`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -10,
                boxShadow: isDarkMode 
                  ? "0 15px 30px rgba(146, 28, 93, 0.4)" 
                  : "0 15px 30px rgba(196, 35, 101, 0.2)"
              }}
            >
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  onError={(e) => {
                    e.target.src = defaultImage; // Fallback image if the original fails to load
                  }}
                />
                {project.link !== "#" && (
                  <div className="project-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="link-icon" />
                    </a>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="view-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ display: "none" }}
        >
          <a href="/projects" className="view-more-btn">
            View All Projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
