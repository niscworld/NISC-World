import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './ViewInternsSubmissions.css';

function ViewInternsSubmissions() {
  const [internships, setInternships] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedInternshipCode, setSelectedInternshipCode] = useState(null);
  const [selectedInternshipTitle, setSelectedInternshipTitle] = useState(null);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Flow states
  const [showGradeScreen, setShowGradeScreen] = useState(false);
  const [showRejectScreen, setShowRejectScreen] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [rejectMessage, setRejectMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isExcellence, setIsExcellence] = useState(false);

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('position');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${API.DASHBOARD_HR_ENDPOINT}/get-internships`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ user_id, role, token }),
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

  const fetchInterns = async (internshipTitle, internshipCode) => {
    setSelectedInternshipCode(internshipCode);
    setSelectedInternshipTitle(internshipTitle);
    setLoading(true);
    setInterns([]);
    try {
      const res = await fetch(`${API.INTERNSHIPS_API}/view-interns-submissions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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

  const handleRejectAssignment = async () => {
    setRejectMessage(document.getElementById("rejectMessage").value)
    if (!rejectMessage) {
      setErrorMsg('Please provide a rejection reason');
      return;
    }

    try {
      const res = await fetch(`${API.REJECT_FINAL_ASSIGNMENT}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          intern_id: selectedIntern.user_id,
          internship_code: selectedIntern.internship_code,
          message: rejectMessage,
          user_id: user_id,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setConfirmationMessage('Assignment rejected successfully!');
        setShowConfirmation(true);
        setShowRejectScreen(false);
        setRejectMessage('');
        setErrorMsg(null);
      } else {
        throw new Error(result?.message || 'Failed to reject assignment.');
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleGradeAssignment = async () => {
    if (starRating === 0 || !feedbackMessage) {
      setErrorMsg('Please provide both a rating and feedback');
      return;
    }

    try {
      const res = await fetch(`${API.ACCEPT_FINAL_ASSIGNMENT}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          intern_id: selectedIntern.user_id,
          internship_code: selectedIntern.internship_code,
          grade: starRating,
          isExcellence: isExcellence,
          message: feedbackMessage,
          user_id: user_id,
          token: token,
          role: role
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setConfirmationMessage('Assignment graded successfully!');
        setShowConfirmation(true);
        setShowGradeScreen(false);
        setStarRating(0);
        setFeedbackMessage('');
        setIsExcellence(false);
        setErrorMsg(null);
      } else {
        throw new Error(result?.message || 'Failed to grade assignment.');
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleBackToInterns = () => {
    setSelectedIntern(null);
    setShowGradeScreen(false);
    setShowRejectScreen(false);
  };

  return (
    <div className="view-interns-container">
      <h3>📋 Internships</h3>

      {loading && <p>Loading...</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}

      {/* Internship List View */}
      {!selectedInternshipCode && !loading && (
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

      {/* Intern List View */}
      {selectedInternshipCode && !selectedIntern && !loading && (
        <>
          <h4>
            <button className='back-button' onClick={() => {
              setSelectedInternshipCode(null);
              setSelectedInternshipTitle(null);
              setInterns([]);
            }}>&lt;</button>
            👨‍🎓 Interns for {selectedInternshipTitle} ({selectedInternshipCode})
          </h4>

          {interns.length === 0 ? (
            <p>No interns currently enrolled.</p>
          ) : (
            <ul className="intern-list">
              {interns.map((intern) => (
                <li key={intern.user_id} className="intern-card">
                  <div className="intern-basic-info">
                    <h4>{intern.fullname}</h4>
                    <p>ID: {intern.user_id}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedIntern(intern);
                      setErrorMsg('');
                    }}
                  >
                    Post Grades
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Intern Details View (After clicking Post Grades) */}
      {selectedIntern && !showGradeScreen && !showRejectScreen && (
        <div className="intern-details-view">
          <button className='back-button' onClick={handleBackToInterns}>&lt;</button>
          <h4>Assignment Details for {selectedIntern.fullname}</h4>
          
          <div className="intern-details">
            <p><strong>Email:</strong> {selectedIntern.email}</p>
            <p><strong>Internship:</strong> {selectedIntern.internship_title}</p>
            <p><strong>Status:</strong> {selectedIntern.completion_status}</p>
            {selectedIntern.assignment_url && (
              <p>
                <strong>Assignment URL:</strong>{' '}
                <a href={selectedIntern.assignment_url} target="_blank" rel="noopener noreferrer">
                  View Assignment
                </a>
              </p>
            )}
            {selectedIntern.submitted_on && (
              <p><strong>Submitted On:</strong> {new Date(selectedIntern.submitted_on).toLocaleString()}</p>
            )}
          </div>

          <div className="action-buttons">
            <button 
              className="grade-button"
              onClick={() => setShowGradeScreen(true)}
            >
              Grade Assignment
            </button>
            <button 
              className="reject-button"
              onClick={() => setShowRejectScreen(true)}
            >
              Reject Assignment
            </button>
          </div>
        </div>
      )}

      {/* Grade Assignment Screen */}
      {showGradeScreen && (
        <div className="grade-screen">
          <button className='back-button' onClick={() => setShowGradeScreen(false)}>&lt;</button>
          <h4>Grade Assignment for {selectedIntern.fullname}</h4>
          
          <div className="rating-section">
            <label>Rating (1-10):</label>
            <div className="stars">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className={index < starRating ? 'filled' : 'empty'}
                  onClick={() => setStarRating(index + 1)}
                  role="button"
                  aria-label={`Rate ${index + 1} out of 10`}
                >
                  ☆
                </span>
              ))}
            </div>
          </div>

<div className="excellence-toggle">
  <label htmlFor="excellenceToggle">Mark as Excellence:</label>
  <label className="toggle-switch">
    <input
      type="checkbox"
      id="excellenceToggle"
      checked={isExcellence}
      onChange={() => setIsExcellence(!isExcellence)}
    />
    <span className="slider round"></span>
  </label>
</div>
          <div className="feedback-section">
            <label htmlFor="feedbackMessage">Feedback:</label>
            <textarea
              id="feedbackMessage"
              placeholder="Provide your feedback here..."
              rows="5"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
          </div>

          <button 
            className="submit-grade"
            onClick={handleGradeAssignment}
          >
            Submit Grade
          </button>
        </div>
      )}

      {/* Reject Assignment Screen */}
      {showRejectScreen && (
        <div className="reject-screen">
          <button className='back-button' onClick={() => setShowRejectScreen(false)}>&lt;</button>
          <h4>Reject Assignment for {selectedIntern.fullname}</h4>
          
          <div className="reject-reason">
            <label htmlFor="rejectMessage">Reason for Rejection:</label>
            <textarea
              id="rejectMessage"
              placeholder="Explain why you're rejecting this assignment..."
              rows="5"
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.value)}
              required
            />
          </div>

          <button 
            className="confirm-reject"
            onClick={handleRejectAssignment}
          >
            Confirm Rejection
          </button>
        </div>
      )}

      {/* Confirmation Screen */}
      {showConfirmation && (
        <div className="confirmation-screen">
          <div className="confirmation-content">
            <h4>{confirmationMessage}</h4>
            <button onClick={() => {
              setShowConfirmation(false);
              handleBackToInterns();
              // Refresh the intern list
              if (selectedInternshipCode) {
                fetchInterns(selectedInternshipTitle, selectedInternshipCode);
              }
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewInternsSubmissions;