import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './ViewApplicantsTable.css';

function ViewApplicantsTable() {
  const [internships, setInternships] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState(null); // "accept" or "reject"
  const [error, setError] = useState('');

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('position');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${API.DASHBOARD_HR_ENDPOINT}/get-internships`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id, token, role }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setInternships(data.internships || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, [user_id, token, role]);

  const viewApplicants = async (code) => {
    setLoading(true);
    try {
      const res = await fetch(`${API.DASHBOARD_HR_ENDPOINT}/view-applicants/${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, token, role }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setApplicants(data.applicants || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const openPopup = (applicant, internshipCode, type) => {
    setSelected({ ...applicant, internship_code: internshipCode });
    setMessage('');
    setPopupType(type);
    setPopupVisible(true);
  };

  const handleDecision = async () => {
    if( popupType === 'contact' ) {
      const apiUrl = API.SEND_MESSAGE_TO_APPLICANT;
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id, token, role,
            email: selected.email,
            internship_code: selected.internship_code,
            message,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        setApplicants(prev => prev.filter(a => a.email !== selected.email));
        setPopupVisible(false);
      } catch (e) {
        alert(e.message);
      }
    } else {
      const apiUrl = popupType === 'accept' ? API.ACCEPT_INTERNSHIP : API.REJECT_INTERNSHIP;
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id, token, role,
            email: selected.email,
            internship_code: selected.internship_code,
            message,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        setApplicants(prev => prev.filter(a => a.email !== selected.email));
        setPopupVisible(false);
      } catch (e) {
        alert(e.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-internships-container">
      <h3>Internships</h3>
      <div className="internships-grid">
        {internships.map(i => (
          <div key={i.code} className="internship-section">
            <strong>{i.title} ({i.code})</strong>
            <br />
            <button onClick={() => viewApplicants(i.code)}>View Applicants</button>
          </div>
        ))}
      </div>

      {applicants.length > 0 ? (
        <div className="applicants-table">
          <h4>Applicants</h4>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Contact</th>
                <th>Applied On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr key={a.email}>
                  <td>{a.fullname}</td>
                  <td>{a.email}</td>
                  <td>
                    {a.resume_url ? (
                      <a href={a.resume_url} target="_blank" rel="noreferrer">View Resume</a>
                    ) : 'N/A'}
                  </td>
                  <td><button onClick={() => openPopup(a, a.internship_code, 'contact')}>Send Message</button></td>
                  <td>{new Date(a.applied_on).toLocaleString()}</td>
                  <td>
                    <button onClick={() => openPopup(a, a.internship_code, 'accept')}>Accept</button>
                    <button onClick={() => openPopup(a, a.internship_code, 'reject')}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No applicants are there.</p>
      )}

      {popupVisible && selected && (
        <div className="popup">
          <div className="popup-content">
            <h4>{popupType.toLocaleUpperCase() + ' Applicant'}</h4>
            <p><strong>Full Name:</strong> {selected.fullname}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Internship Code:</strong> {selected.internship_code}</p>
            <p><strong>Applied On:</strong> {new Date(selected.applied_on).toLocaleString()}</p>
            {selected.resume_url && (
              <p>
                <strong>Resume:</strong> <a href={selected.resume_url} target="_blank" rel="noreferrer">View</a>
              </p>
            )}
            <textarea
              placeholder="Message from HR..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
            />
            <div className="popup-actions">
              <button onClick={handleDecision}>Confirm</button>
              <button onClick={() => setPopupVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewApplicantsTable;
