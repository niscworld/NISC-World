// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard.jsx';
import Internships from './pages/Internships.jsx';
// import About from './pages/About';
// import Projects from './pages/Projects';
// import Blog from './pages/Blog';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound'; // ✅ Import 404 page

import RefundPolicy from './pages/RefundPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

import usePreventRefresh from './hooks/usePreventRefresh.jsx';

import './App.css';


function App() {
  const { isDarkMode } = useTheme();
  usePreventRefresh(); // 🚫 Hook to block refresh

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/internships" element={<Internships />} />
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




