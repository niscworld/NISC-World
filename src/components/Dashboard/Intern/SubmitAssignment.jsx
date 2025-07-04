// components/Dashboard/Intern/InternMainPanel.jsx
import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import './InternSubmitAssignment.css'; // Make sure this path matches your file structure

function SubmitAssignment() {
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [url, setUrl] = useState('');
  const [grade, setGrade] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem('user_id');
  const role = localStorage.getItem('position');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Check if already submitted
    const checkSubmissionStatus = async () => {
      try {
        const res = await fetch(API.INTERN_SUBMIT_ASSIGNMENT, {
          method: 'POST', // Using POST since body is required
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'check', // flag to check submission status
            user_id,
            token,
          }),
        });

        const result = await res.json();
        setIsSubmitted(result.submitted || false);
        if (result.submitted && result.url) {
          setUrl(result.url);
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
        setMessage('Failed to check submission status.');
      } finally {
        setLoading(false);
      }
    };

    checkSubmissionStatus();
  }, [user_id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setMessage('Please enter a valid URL.');
      return;
    }

    const submissionData = {
      user_id,
      role,
      url,
      token,
    };

    try {
      const res = await fetch(API.INTERN_SUBMIT_ASSIGNMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setMessage('Assignment submitted successfully.');
        setIsSubmitted(true);
        setUrl(submissionData.url);
        setGrade(submissionData.grade);
        setRemarks(submissionData.remarks);
      } else {
        setMessage(result.message || 'Submission failed.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('An error occurred during submission.');
    }
  };

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="submit-assignment-container">
      {/* You can enable this header if you want */}
      {/* <h2>Submit Your Assignment</h2> */}

      {isSubmitted ? (
        <>
          <p>Your Assignment Submitted..</p>
          <p>
            URL:{' '}
            <u>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </u>
            <br />
            Grade: {grade}
            <br />
            {/* Remarks: {remarks} */}
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">Assignment URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://example.com/your-assignment"
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {message && (
        <p
          className={`submit-assignment-message ${
            /error|fail|missing/i.test(message) ? 'error' : ''
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default SubmitAssignment;
