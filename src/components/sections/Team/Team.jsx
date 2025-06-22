import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { FaLinkedin, FaTwitter, FaGithub, FaUserTie } from 'react-icons/fa';
import defaultUserImage from './assets/default_user.jpg';
import srinivasPhoto from './assets/Srinu.jpg';
import rushvithaPhoto from './assets/Rushvitha.jpg';
import './Team.css';

const Team = () => {
  const { isDarkMode } = useTheme();

  const teamMembers = [
    {
      name: "P Rushvitha Devi",
      role: "Founder & Owner",
      bio: "Visionary leader with expertise in strategic planning and business development.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      },
      photo: rushvithaPhoto,
      visible: true
    },
    {
      name: "K Srinivas Charan",
      role: "Co-Founder & CEO",
      bio: "Technology expert with 3+ years of experience in software architecture and innovation.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      },
      photo: srinivasPhoto,
      visible: true
    },
  ];

  return (
    <section className={`team-section ${isDarkMode ? 'dark' : 'light'}`} id="team">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title">
            Our <span className="highlight">Leadership</span>
          </h2>
          <p className="section-subtitle">
            The visionary minds behind NISC World
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.filter(member => member.visible).map((member, index) => (
            <motion.div 
              key={index}
              className={`team-card ${isDarkMode ? 'dark' : 'light'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="photo-container">
                <div className="photo-wrapper">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="member-photo"
                    />
                  ) : (
                    <div className="default-avatar">
                      <FaUserTie className="avatar-icon" />
                    </div>
                  )}
                </div>
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <div className="social-links">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
