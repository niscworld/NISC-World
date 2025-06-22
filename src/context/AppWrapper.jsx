import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/MainApi';
import './AppWrapper.css';

function AppWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refresh_token');
      const expiresAt = localStorage.getItem('expires_at');
      const user_id = localStorage.getItem('user_id');

      if (token && expiresAt) {
        const now = new Date();
        const exp = new Date(expiresAt);

        if (exp > now) {
          setIsLoggedIn(true);
        } else {
          // Session expired, try to refresh
          try {
            const res = await fetch(API.REFRESH_TOKEN_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id,
                jwt_token: token,
                refresh_token: refreshToken,
              }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
              localStorage.setItem('token', data.token);

              // Decode new expiry time from token
              const newExp = JSON.parse(atob(data.token.split('.')[1])).exp;
              const newExpiryDate = new Date(newExp * 1000).toISOString();
              localStorage.setItem('expires_at', newExpiryDate);

              setIsLoggedIn(true);
            } else {
              throw new Error('Refresh failed');
            }
          } catch (err) {
            console.error('Session refresh error:', err);
            setIsLoggedIn(false);
            setShowSessionExpired(true);
          }
        }
      } else {
        // No session found
        setIsLoggedIn(false);
        setShowSessionExpired(true);
      }
    };

    checkSession();
  }, [location]);

  const handleLoginRedirect = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <>
      {isLoggedIn && children}

      {showSessionExpired && (
        <div className="session-expired-modal">
          <div className="session-expired-box">
            <h3>⚠️ Session Expired</h3>
            <p>Your session has expired. Please log in again to continue.</p>
            <button onClick={handleHomeRedirect}>Home</button>
            <button onClick={handleLoginRedirect}>Login</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AppWrapper;
