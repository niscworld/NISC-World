// src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ENDPOINT } from './../api/MainApi.js'; // ✅ Import API endpoint

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');      // ✅ Message box state
  const [messageType, setMessageType] = useState(''); // success | error | info

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Getting you logged in...');
    setMessageType('info');

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful! Redirecting...');
        setMessageType('success');

        // Optionally save token
        // localStorage.setItem('token', data.token);

        // Delay a bit before redirecting
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage(data.message || 'Invalid credentials.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong...');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {/* ✅ Message Box */}
        {message && (
          <div className={`message-box ${messageType}`}>
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="User ID"
          value={id}
          required
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default Login;
