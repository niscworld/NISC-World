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
import './App.css';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/projects" element={<Projects />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> {/* ✅ New route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ New route */}
          <Route path="/internships" element={<Internships />} /> {/* ✅ New route */}
          <Route path="*" element={<NotFound />} /> {/* ✅ Catch-all route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;