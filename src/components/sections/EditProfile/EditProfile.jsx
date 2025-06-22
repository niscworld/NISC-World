import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './EditProfile.css';

function EditProfile() {
  const user_id = localStorage.getItem('user_id');

  const [profileData, setProfileData] = useState({
    fullname: '',
    email: '',
    position: ''
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // success | error | info

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(API.VIEW_PROFILE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile');

        setProfileData({
          fullname: data.fullname || '',
          email: data.email || '',
          position: data.position || ''
        });
      } catch (err) {
        console.error('Fetch profile error:', err);
        setMessage('❌ Could not load profile.');
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('⏳ Updating profile...');
    setStatus('info');

    try {
      const res = await fetch(API.EDIT_PROFILE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, ...profileData })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');

      setMessage('✅ Profile updated successfully!');
      setStatus('success');
    } catch (err) {
      console.error('Update profile error:', err);
      setMessage('❌ Error updating profile.');
      setStatus('error');
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Your Profile</h2>

      {message && <p className={`status-message ${status}`}>{message}</p>}

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Position
          <input readOnly
            type="text"
            name="position"
            value={profileData.position}
            onChange={handleChange}
            placeholder="Your role (e.g., Intern, Developer)"
          />
        </label>

        <button type="submit">💾 Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
