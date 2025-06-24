import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { FaLinkedin, FaTwitter, FaGithub, FaUserTie } from 'react-icons/fa';

import defaultUserImage from './assets/default_user.jpg';
import srinivasPhoto from './assets/Srinu.jpg';
import rushvithaPhoto from './assets/Rushvitha.jpg';
import rekashPhoto from "./assets/Rekash.jpg";
import mohoseenPhoto from "./assets/Mohoseen.jpg";
import gowthamPhoto from "./assets/Gowtham.jpg";
import mouryaPhoto from "./assets/Mourya.jpg";

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
  {
    name: "N Rekash",
    role: "Director of Development",
    bio: "Experienced full-stack developer specializing in scalable web applications and agile project management. Passionate about building efficient and reliable software solutions.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    photo: rekashPhoto,
    visible: true
  },
  {
    name: "V Gowtham",
    role: "Director of Financial Strategies",
    bio: "Finance professional with a strong background in budgeting, financial modeling, and growth strategy. Committed to maximizing value and ensuring fiscal health.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    photo: gowthamPhoto,
    visible: true
  },
  {
    name: "P Mourya",
    role: "Director of Marketing",
    bio: "Creative marketer skilled in brand development, digital campaigns, and market research. Known for driving engagement and elevating brand presence.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    photo: mouryaPhoto,
    visible: true
  },
  {
    name: "SK Mohoseen",
    role: "Director of Design",
    bio: "Innovative designer with expertise in UI/UX, visual storytelling, and user-centered design. Dedicated to creating intuitive and impactful digital experiences.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    photo: mohoseenPhoto,
    visible: true
  },
];


  // return (<></>); 
  
  return(
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
  {member.social.linkedin !== "#" && (
    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </a>
  )}
  {member.social.twitter !== "#" && (
    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
      <FaTwitter />
    </a>
  )}
  {member.social.github !== "#" && (
    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
      <FaGithub />
    </a>
  )}
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
