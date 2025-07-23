import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <>
      <style>{`
        .internships-list {
          padding: 2rem;
          max-width: 1100px;
          margin: auto;
          font-family: 'Segoe UI', sans-serif;
          color: var(--black);
        }

        .internships-list h3 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--deep-magenta);
        }

        .internships-list form {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .internships-list input {
          padding: 0.7rem;
          border: 1px solid var(--light-gray);
          border-radius: 6px;
          font-size: 1rem;
          width: 280px;
          transition: border 0.3s ease;
        }

        .internships-list input:focus {
          border-color: var(--bright-pink);
          outline: none;
        }

        .internships-list button {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 6px;
          background: var(--bright-orange);
          color: var(--pure-white);
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .internships-list button:hover {
          background: var(--vibrant-red);
        }

        @media (max-width: 480px) {
          .internships-list {
            padding: 1rem;
          }

          .internships-list input {
            width: 100%;
            font-size: 0.95rem;
          }

          .internships-list button {
            width: 100%;
            font-size: 0.95rem;
          }
        }
      `}</style>

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
    </>
  );
}

export default VerifyInternship;
