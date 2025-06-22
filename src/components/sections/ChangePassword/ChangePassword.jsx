import React, { useState } from 'react';
import API from '../../../api/MainApi';
import './ChangePassword.css'; // Optional for custom styling

function ChangePassword() {
  const user_id = localStorage.getItem('user_id');

  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setMessage('❌ New password and confirm password do not match.');
      setStatus('error');
      return;
    }

    setMessage('Changing password...');
    setStatus('info');

    try {
      const res = await fetch(`${API.CHANGE_PASSWORD}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id,
          old_password: formData.old_password,
          new_password: formData.new_password
        })
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Password changed successfully!');
        setStatus('success');
        setFormData({
          old_password: '',
          new_password: '',
          confirm_password: ''
        });
      } else {
        setMessage(result.message || '❌ Failed to change password.');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error.');
      setStatus('error');
    }
  };

  return (
    <div className="change-password-form">
      <h3>Change Password</h3>
      {message && <p className={`message ${status}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="old_password"
          value={formData.old_password}
          onChange={handleChange}
          placeholder="Old Password"
          required
        />
        <input
          type="password"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="Confirm New Password"
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
