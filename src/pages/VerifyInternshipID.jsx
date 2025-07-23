import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from './../api/MainApi';
import './Internships.css';

function VerifyInternshipID() {
  const { internshipId } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyInternship = async () => {
      setLoading(true);
      setError('');
      setResult(null);

      try {
        const res = await fetch(`${API.VERIFY_INTERNSHIP}/${internshipId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Verification failed.');
        }

        setResult(data);
      } catch (err) {
        console.error(err);
        setError(err.message || '❌ Server error.');
      } finally {
        setLoading(false);
      }
    };

    if (internshipId) {
      verifyInternship();
    }
  }, [internshipId]);

  return (
    <div className="internships-list">
      <h3>
        Internship Verification Result |
        <Link to="/internships" style={{ marginLeft: '10px' }}>← Back to Internships</Link>
      </h3>

      {loading && <p>🔄 Verifying internship ID...</p>}
      {error && <p className="error">{error}</p>}

      {result && (
        <>
        <div className="internship-card">
          <h3>Internship Verified ✅</h3>

          <p><strong>User ID:</strong> {result.user_id}</p>
          <p><strong>Full Name:</strong> {result.full_name}</p>
          <p><strong>Certifcation:</strong> {result.excellence ? 'Excellence Certification' : 'Internship Certification'}</p>
          <p><strong>Completion Status:</strong> {result.completion_status}</p>

          <h3>📋 Internship Details:</h3>
          <p><strong>Title:</strong> {result.internship_details?.title}</p>
          <p><strong>Duration:</strong> {result.internship_details?.duration}</p>
        </div>

        <br />
        <hr />
        <br />

        <div className="certificate">
          <div className="certificate-button" style={{zoom: '1.3', padding: '10px'}} >
            <input type="button" value="Download Certificate" disabled={true} />
          </div>
          <br />
          <div className="certificate-image">
            <div>Certificate is not yet released! Please wait for few more days...</div>
          </div>
        </div>
        </>

      )}

      {!loading && !result && !error && (
        <p className="error">❌ Internship ID not found or not verified.</p>
      )}

    </div>
  );
}

export default VerifyInternshipID;
