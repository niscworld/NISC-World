// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // Dark mode context
import './styles/globals.css'; // Base styles
import './styles/animations.css'; // Scroll/float animations

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* Wrap app for dark mode */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);