// components/Dashboard/Developer/CreateUserForm.jsx
import React, { useState } from 'react';
import API from './../../../api/MainApi';

function CreateUserForm() {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    fullname: '',
    email: '',
    position: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage('Creating user...');
    setMessageType('info');

    // Construct payload
    const submissionData = {
      user_id: formData.user_id.trim(),
      password: formData.password,
      fullname: formData.fullname.trim() || 'NO NAME',
      position: formData.position
    };

    if (formData.email.trim()) {
      submissionData.email = formData.email.trim();
    }

    try {
      const res = await fetch(`${API.DEVELOPER_CREATE_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ User created successfully!');
        setMessageType('success');
        setFormData({
          user_id: '',
          password: '',
          fullname: '',
          email: '',
          position: ''
        });
      } else {
        setMessage(result.message || '❌ Failed to create user.');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-user-form">
      <h3>Create New User</h3>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="user_id"
          placeholder="User ID"
          required
          value={formData.user_id}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input
          name="fullname"
          placeholder="Full Name (optional, defaults to NO NAME)"
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email (optional)"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <select
          name="position"
          required
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">-- Select Position --</option>
          <option value="Intern">Intern</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
          {/* Add more if needed */}
        </select>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateUserForm;
