import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API from './../api/MainApi.js';
import { refreshToken } from '../utils/refreshToken'; // ✅ Import the refresh utility

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // ✅ Try auto-login if tokens are in localStorage
  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (user_id && token && refresh_token) {
      const expiry = localStorage.getItem('expires_at');
      const expiryDate = new Date(expiry);
      const now = new Date();

      if (expiryDate > now) {
        console.log('[AUTO-LOGIN] Token still valid. Redirecting...');
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        console.log('[AUTO-LOGIN] Token expired. Attempting refresh...');
        refreshToken()
          .then(result => {
            if (result.success) {
              setMessage('Auto-login successful!');
              setMessageType('success');
              setTimeout(() => navigate('/dashboard'), 1000);
            } else {
              setMessage('Session expired. Please login again.');
              setMessageType('error');
            }
          })
          .catch(() => {
            setMessage('Auto-login error. Please login.');
            setMessageType('error');
          });
      }
    }
  }, []);

  // ✅ Manual login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Getting you logged in...');
    setMessageType('info');

    try {
      const response = await fetch(API.LOGIN_ENDPOINT, {
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

        // ✅ Save everything
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user_id', data.user);
        localStorage.setItem('expires_at', data.expires_at);
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('position', data.position);

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

        {message && <div className={`message-box ${messageType}`}>{message}</div>}

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
