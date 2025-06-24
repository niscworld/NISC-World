import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './ViewApplicantsTable.css';

function ViewApplicantsTable() {
  const [groupedApplicants, setGroupedApplicants] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionStatus, setActionStatus] = useState({});
  const [messages, setMessages] = useState({});

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('position');

  useEffect(() => {
    if (!user_id || !token || !role) {
      setError('Missing credentials. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchApplicants = async () => {
      try {
        const res = await fetch(`${API.DASHBOARD_HR_ENDPOINT}/view-applicants`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id, token, role }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || '❌Failed to fetch applicants');
        setGroupedApplicants(data);
      } catch (err) {
        console.error(err);
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [user_id, token, role]);

  const handleMessageChange = (key, value) => {
    setMessages((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAction = async (action, applicant) => {
    const endpoint =
      action === 'accept' ? API.ACCEPT_INTERNSHIP : API.REJECT_INTERNSHIP;

    const key = `${applicant.email}_${applicant.internship_code}`;
    const message = messages[key] || '';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id,
          token,
          role,
          fullname: applicant.fullname,
          email: applicant.email,
          resume_url: applicant.resume_url,
          internship_code: applicant.internship_code,
          message,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setActionStatus((prev) => ({
          ...prev,
          [key]: `${action.toUpperCase()}ED ✅`,
        }));
      } else {
        throw new Error(result.message || 'Action failed');
      }
    } catch (err) {
      console.error(err);
      setActionStatus((prev) => ({
        ...prev,
        [key]: `❌ ${action.toUpperCase()} Failed`,
      }));
    }
  };

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!groupedApplicants || Object.keys(groupedApplicants).length === 0)
    return <p>No applicants found.</p>;

  return (
    <div className="view-applicants" style={{ overflowX: 'auto' }}>
      {Object.entries(groupedApplicants).map(([code, group]) => (
        <div className="internship-section" key={code}>
          <h4 className="internship-title">
            {group.internship.title} ({code})
          </h4>
          <p className="internship-details">
            <strong>Dept:</strong> {group.internship.department || 'N/A'} &nbsp; | &nbsp;
            <strong>Location:</strong> {group.internship.location || 'N/A'} &nbsp; | &nbsp;
            <strong>Duration:</strong> {group.internship.duration || 'N/A'} &nbsp; | &nbsp;
            <strong>Stipend:</strong> {group.internship.stipend || 'N/A'}
          </p>
          <table className="hr-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Applied On</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {group.applicants.map((applicant, idx) => {
                const key = `${applicant.email}_${applicant.internship_code}`;
                return (
                  <tr key={idx}>
                    <td>{applicant.fullname}</td>
                    <td>{applicant.email}</td>
                    <td>
                      <a
                        href={applicant.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </td>
                    <td>{applicant.applied_on}</td>
                    <td>
                      <textarea
                        placeholder="Type message here..."
                        value={messages[key] || ''}
                        onChange={(e) => handleMessageChange(key, e.target.value)}
                        rows={2}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleAction('accept', applicant)}
                        disabled={actionStatus[key]?.includes('✅')}
                      >
                        Accept
                      </button>{' '}
                      <button
                        onClick={() => handleAction('reject', applicant)}
                        disabled={actionStatus[key]?.includes('✅')}
                      >
                        Reject
                      </button>
                      <div className="action-status">{actionStatus[key]}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ViewApplicantsTable;
