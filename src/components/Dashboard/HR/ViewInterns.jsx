import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './ViewInterns.css';

function ViewInterns() {
  const [internships, setInternships] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedInternshipCode, setSelectedInternshipCode] = useState(null);
  const [selectedInternshipTitle, setSelectedInternshipTitle] = useState(null);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [messageData, setMessageData] = useState({ subject: '', body: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('position');

  // Fetch internships on load
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${API.DASHBOARD_HR_ENDPOINT}/get-internships`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id, token, role }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || 'Failed to fetch internships');
        setInternships(data.internships || []);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [user_id, token, role]);

  // Fetch interns for a specific internship
  const fetchInterns = async (internshipTitle, internshipCode) => {
    setSelectedInternshipCode(internshipCode);
    setSelectedInternshipTitle(internshipTitle);
    setLoading(true);
    setInterns([]);
    try {
      const res = await fetch(`${API.INTERNSHIPS_API}/view-interns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, token, role, internship_code: internshipCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || 'Failed to fetch interns');
      setInterns(data || []);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedIntern){
      setStatusMessage('❌ Select an intern.');
      return;
    }
    if(!messageData.subject || !messageData.body) {
      setStatusMessage('❌ Fill all fields.');
      return;
    }

    try {
      const res = await fetch(`${API.SEND_MESSAGE_TO_INTERN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedIntern.email,
          subject: messageData.subject,
          body: messageData.body,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMessage('✅ Message sent successfully!');
        setMessageData({ subject: '', body: '' });
        setSelectedIntern(null);
      } else {
        setStatusMessage(result.message || '❌ Failed to send message.');
      }
    } catch (err) {
      setStatusMessage('❌ Server error.');
    }
  };

  return (
    <div className="view-interns-container">
      <h3>📋 Internships</h3>

      {loading && <p>Loading...</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}

      {/* Show internship list first */}
      {!loading && !selectedInternshipCode && (
        <div className="internships-grid">
          {internships.map((i) => (
            <div key={i.code} className="internship-section">
              <strong>{i.title} ({i.code})</strong>
              <br />
              <button onClick={() => fetchInterns(i.title, i.code)}>View Interns</button>
            </div>
          ))}
        </div>
      )}

      {/* Show interns for selected internship */}
      {selectedInternshipCode && !loading && (
        <>
          <h4><button className='back-button' onClick={() => setSelectedInternshipCode(null)}>&lt;</button> 👨‍🎓 Interns for Internship: {selectedInternshipTitle} ({selectedInternshipCode})</h4>

          {interns.length === 0 ? (
            <p>No interns currently enrolled.</p>
          ) : (
            <ul className="intern-list">
              {interns.map((intern) => (
                <li key={intern.user_id + intern.internship_code} className="intern-card">
                  <h4>{intern.fullname}</h4>
                  <p><strong>Email:</strong> {intern.email}</p>
                  <p><strong>Internship:</strong> {intern.internship_title}</p>
                  <p><strong>Status:</strong> {intern.completion_status}</p>
                  <button onClick={() => { setSelectedIntern(intern); setStatusMessage(''); }}>📩 Message</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Modal */}
      {selectedIntern && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Send Message to {selectedIntern.fullname}</h4>
            <input
              type="text"
              placeholder="Subject"
              value={messageData.subject}
              onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
            />
            <textarea
              placeholder="Body"
              rows="5"
              value={messageData.body}
              onChange={(e) => setMessageData({ ...messageData, body: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleSendMessage}>Send</button>
              <button className="cancel-btn" onClick={() => setSelectedIntern(null)}>Cancel</button>
            </div>
            {statusMessage && <p className="status">{statusMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewInterns;
