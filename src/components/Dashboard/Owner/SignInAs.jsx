import React, { useState } from 'react';
import API from '../../../api/MainApi';
import './SignInAs.css';
import { useNavigate } from 'react-router-dom'; // To handle navigation

function SignInAs() {
  const [userIdInput, setUserIdInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [signedInUser, setSignedInUser] = useState(null); // New state for storing returned values

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('position');
  
  const navigate = useNavigate(); // Add useNavigate hook for navigation

  const handleSignIn = async () => {
    if (!userIdInput) {
      setErrorMsg('❌ Please enter a user ID.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setStatusMessage('');
    setSignedInUser(null); // Reset the previous user data on new sign-in

    try {
      const res = await fetch(`${API.OWNER_SIGNIN_AS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          sign_in_as: userIdInput, // Pass the current owner’s user_id
          token,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to sign in as user.');
      }

      setStatusMessage('✅ Successfully signed in as user!');
      setSignedInUser(data); // Save the returned data in state

      // ✅ Save the user details to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user_id', data.user);
      localStorage.setItem('expires_at', data.expires_at);
      localStorage.setItem('fullname', data.fullname);
      localStorage.setItem('email', data.email);
      localStorage.setItem('position', data.position);

      // Navigate to the login page or dashboard
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 1500); // Add a small delay to show success message
    } catch (err) {
      setErrorMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-as-container">
      <h3>🔑 Sign In As</h3>
      <div className="sign-in-box">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleSignIn} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
      
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      {/* Display the returned values once successfully signed in */}
      {signedInUser && (
        <div className="sign-in-info">
          <h4>Signed In As: {signedInUser.fullname}</h4>
          <div className="info-item"><strong>User ID:</strong> {signedInUser.user}</div>
          <div className="info-item"><strong>Email:</strong> {signedInUser.email}</div>
          <div className="info-item"><strong>Position:</strong> {signedInUser.position}</div>
          <div className="info-item"><strong>Expires At:</strong> {new Date(signedInUser.expires_at).toLocaleString()}</div>
          {/* You can also display tokens here, but it’s typically not recommended to display JWT tokens */}
        </div>
      )}
    </div>
  );
}

export default SignInAs;
