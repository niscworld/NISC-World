import React, { useState } from 'react';
import API from './../../../api/MainApi';

function AddInternship() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    duration: '',
    location: '',
    stipend: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required.';
    if (!formData.description.trim()) return 'Description is required.';
    if (!formData.department.trim()) return 'Department is required.';
    if (!formData.duration.trim()) return 'Duration is required.';
    if (!formData.location.trim()) return 'Location is required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('position');

    if (!user_id || !token || !role) {
      setMessage('Missing user credentials. Please log in again.');
      setMessageType('error');
      return;
    }

    const errorMsg = validateForm();
    if (errorMsg) {
      setMessage(`❌ ${errorMsg}`);
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('Creating internship...');
    setMessageType('info');

    const submissionData = {
      ...formData,
      user_id,
      token,
      role
    };

    try {
      const res = await fetch(API.CREATE_INTERNSHIP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Internship created successfully!');
        setMessageType('success');
        setFormData({
          title: '',
          description: '',
          department: '',
          duration: '',
          location: '',
          stipend: ''
        });
      } else {
        setMessage(result.message || '❌ Failed to create internship.');
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
    <div className="create-internship-form">
      <h3>Create Internship</h3>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="department"
          placeholder="Department"
          required
          value={formData.department}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="duration"
          placeholder="Duration (e.g., 3 months)"
          required
          value={formData.duration}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="location"
          placeholder="Location"
          required
          value={formData.location}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default AddInternship;
