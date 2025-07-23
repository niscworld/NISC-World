// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard.jsx';
import Internships from './pages/Internships.jsx';
import VerifyInternship from './pages/VerifyInternship.jsx';
import VerifyInternshipID from './pages/VerifyInternshipID.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound';
import RefundPolicy from './pages/RefundPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import usePreventRefresh from './hooks/usePreventRefresh.jsx';
import MouseRing from './hooks/MouseRing.jsx';
import './App.css';

function App() {
  const { isDarkMode } = useTheme();
  usePreventRefresh();

  useEffect(() => {
    const createBackgroundElements = () => {
      return;
      const container = document.querySelector('.background-animation');
      if (!container) return;

      // Clear existing elements
      container.innerHTML = '';

      // Create animated lines with random rotations
      for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = `animated-line line-${i}`;
        // Set random rotation between -15 and 15 degrees
        line.style.setProperty('--rotation', `${Math.random() * 30 - 15}deg`);
        container.appendChild(line);
      }

      // Create floating dots with random positions
      for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.className = `floating-dot dot-${i}`;
        // Set random positions
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        // Random size between 3px and 8px
        const size = 3 + Math.random() * 5;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        // Random animation duration between 10s and 25s
        dot.style.animationDuration = `${10 + Math.random() * 15}s`;
        container.appendChild(dot);
      }
    };

    createBackgroundElements();

    // Recreate elements when window resizes
    const handleResize = () => createBackgroundElements();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDarkMode]);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="background-animation"></div>
      <MouseRing />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/verify" element={<VerifyInternship />} />
          <Route path="/internship/verify/:internshipId" element={<VerifyInternshipID />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;