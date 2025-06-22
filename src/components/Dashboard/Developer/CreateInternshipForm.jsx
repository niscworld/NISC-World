// components/Dashboard/Developer/CreateInternshipForm.jsx
import React, { useState } from 'react';
import API from './../../../api/MainApi';
import './CreateInternshipForm.css';

function CreateInternshipForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setMessage('❌ Title is required.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('Creating internship...');
    setMessageType('info');

    try {
      const res = await fetch(`${API.DEVELOPER_CREATE_INTERNSHIP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (e.g., 3 months)"
          value={formData.duration}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateInternshipForm;
