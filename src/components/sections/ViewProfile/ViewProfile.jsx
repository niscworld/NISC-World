import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './ViewProfile.css';

function ViewProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API.VIEW_PROFILE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id }),
        });

        const data = await res.json();

        if (res.ok) {
          setProfile(data);
        } else {
          setError(data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        console.error(err);
        setError('Server error while fetching profile');
      }
    };

    fetchProfile();
  }, [user_id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="view-profile-container">
      <h3>👤 Profile Details</h3>
      <div className="profile-item"><strong>User ID:</strong> {profile.user_id}</div>
      <div className="profile-item"><strong>Full Name:</strong> {profile.fullname}</div>
      <div className="profile-item"><strong>Email:</strong> {profile.email || 'Not provided'}</div>
      <div className="profile-item"><strong>Position:</strong> {profile.position}</div>
    </div>
  );
}

export default ViewProfile;
