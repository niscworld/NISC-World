import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './ViewInterns.css';

function ViewInterns() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [messageData, setMessageData] = useState({ subject: '', body: '' });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await fetch(`${API.INTERNSHIPS_API}/view-interns`);
        const data = await res.json();
        setInterns(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterns();
  }, []);

  const handleSendMessage = async () => {
    if (!selectedIntern || !messageData.subject || !messageData.body) {
      setStatusMessage('❌ Fill all fields and select an intern.');
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
      <h3>👨‍🎓 Current Interns</h3>

      {loading ? (
        <p>Loading interns...</p>
      ) : interns.length === 0 ? (
        <p>No interns currently enrolled.</p>
      ) : (
        <ul className="intern-list">
          {interns.map((intern) => (
            <li key={intern.user_id + intern.internship_code} className="intern-card">
              <h4>{intern.fullname}</h4>
              <p><strong>Email:</strong> {intern.email}</p>
              <p><strong>Internship:</strong> {intern.internship_title}</p>
              <p><strong>Status:</strong> {intern.completion_status}</p>
              <button onClick={() => {setSelectedIntern(intern); setStatusMessage('')}}>📩 Message</button>
            </li>
          ))}
        </ul>
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
