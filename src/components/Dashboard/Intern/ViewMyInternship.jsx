// components/Dashboard/Intern/ViewMyInternship.jsx
import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';

function ViewMyInternship() {
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(API.INTERNSHIPS_API + '/view-my-internship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInternship(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading internship...</div>;
  if (!internship || !internship.success) return <div>No internship found</div>;

  const info = internship.data;

  return (
    <div className="internship-details">
      <h3>{info.title}</h3>
      <p><strong>Department:</strong> {info.department}</p>
      <p><strong>Duration:</strong> {info.duration}</p>
      <p><strong>Status:</strong> {info.completion_status}</p>
      <p><strong>Stipend:</strong> {info.stipend}</p>
      <p><strong>HR:</strong> {info.hr_name}</p>
    </div>
  );
}

export default ViewMyInternship;
