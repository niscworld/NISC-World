// components/Dashboard/Developer/Internships.jsx
import React, { useEffect, useState } from 'react';
import API from './../api/MainApi';

function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(API.GET_INTERNSHIPS);
        if (!res.ok) throw new Error('Failed to fetch internships');
        const data = await res.json();
        setInternships(data);
      } catch (err) {
        console.error(err);
        setError('❌ Error fetching internships.');
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="internships-list">
      <h3>Available Internships</h3>

      {loading && <p>Loading internships...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && internships.length === 0 && <p>No internships available.</p>}

      <ul>
        {internships.map((internship) => (
          <li key={internship.id} className="internship-card">
            <h4>{internship.title}</h4>
            {internship.description && <p>{internship.description}</p>}
            <p><strong>Department:</strong> {internship.department || 'N/A'}</p>
            <p><strong>Duration:</strong> {internship.duration || 'N/A'}</p>
            <p><strong>Location:</strong> {internship.location || 'N/A'}</p>
            <p><strong>Stipend:</strong> {internship.stipend || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Internships;
