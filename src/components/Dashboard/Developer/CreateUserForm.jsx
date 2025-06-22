import React, { useState } from 'react';
import API from './../../../api/MainApi';
import './CreateUserForm.css';

function CreateUserForm() {
  const [formData, setFormData] = useState({
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

    const submissionData = {
      password: formData.password,
      fullname: formData.fullname.trim() || 'NO NAME',
      position: formData.position.trim()
    };

    if (formData.email.trim()) {
      submissionData.email = formData.email.trim();
    }

    try {
      const res = await fetch(`${API.DEVELOPER_CREATE_USER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(`✅ User created successfully! Generated ID: ${result.user_id} Password: ${result.password}`);
        setMessageType('success');
        setFormData({
          password: '',
          fullname: '',
          email: '',
          position: ''
        });
        // Copy to clipboard
        const textToCopy = `Username: ${result.user_id}\nPassword: ${result.password}`;
        navigator.clipboard.writeText(textToCopy)
          .then(() => console.log('📋 Credentials copied to clipboard!'))
          .catch(err => console.error('❌ Clipboard copy failed:', err));
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
          name="password"
          placeholder="Password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input
          name="fullname"
          placeholder="Full Name (optional)"
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
          <option value="User">User</option>
          <option value="Client">Client</option>

          <option value="Intern">Intern</option>
          <option value="Trainee">Trainee</option>

          <option value="HR">HR</option>

          <option value="Admin">Admin</option>
          <option value="COE">COE</option>
          <option value="CTO">CTO</option>
          <option value="CFO">CFO</option>
          <option value="CHRO">CHRO</option>
          <option value="DOD">DOD</option>
          <option value="DOT">DOT</option>
          <option value="DOS">DOS</option>

          <option value="Employee">Employee</option>
          <option value="Staff">Staff</option>

          <option value="Owner">Owner</option>
        </select>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateUserForm;
