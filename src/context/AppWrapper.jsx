import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/MainApi';

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
          setIsLoggedIn(false);
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
              // Optionally update expiry timestamp here
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
        <div style={modalStyle}>
          <div style={modalBoxStyle}>
            <h3>⚠️ Session Expired</h3>
            <p>Your session has expired. Please login again to continue.</p>
            <button onClick={handleHomeRedirect}>Home</button>
            <button onClick={handleLoginRedirect}>Login</button>
          </div>
        </div>
      )}
    </>
  );
}


// Minimal inline modal styling
const modalStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  zIndex: 9999,
};

const modalBoxStyle = {
  backgroundColor: '#fff',
  padding: '20px 30px',
  borderRadius: '8px',
  textAlign: 'center',
  color: 'black',
};

export default AppWrapper;