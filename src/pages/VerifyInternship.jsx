import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Internships.css'; // Reuse the styling

function VerifyInternship() {
  const [internshipId, setInternshipId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (internshipId.trim()) {
      navigate(`/internship/verify/${internshipId.trim()}`);
    }
  };

  return (
    <div className="internships-list">
      <h3>
        Verify Internship | <a href="/internships">← Back to Internships</a>
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Internship ID"
          value={internshipId}
          onChange={(e) => setInternshipId(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyInternship;
