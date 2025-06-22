import React, { useEffect, useState } from 'react';
import API from './../api/MainApi';
import './Internships.css';

function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedInternshipName, setSelectedInternshipName] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    resume_url: '',
    otp: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

  const openApplyModal = (code, internship_name) => {
    setSelectedCode(code);
    setSelectedInternshipName(internship_name);
    setShowModal(true);
    setFormMessage('');
    setOtpSent(false);
    setOtpVerified(false);
    setFormData({ fullname: '', email: '', resume_url: '', otp: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCode(null);
    setSelectedInternshipName(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendOtp = async () => {
    if (!formData.fullname || !formData.email) {
      setFormMessage('Please enter name and email first.');
      return;
    }

    try {
      const res = await fetch(API.SEND_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: formData.email,
          verify_for: `Internship Application - ${selectedInternshipName}`,
          name: formData.fullname
        })
      });

      const result = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setFormMessage('📧 OTP sent to your email.');
      } else {
        setFormMessage(result.message || '❌ Failed to send OTP.');
      }
    } catch (err) {
      console.error(err);
      setFormMessage('❌ Server error while sending OTP.');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch(API.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: formData.email,
          verify_for: `Internship Application - ${selectedInternshipName}`,
          otp: formData.otp
        })
      });

      const result = await res.json();

      if (res.ok) {
        setOtpVerified(true);
        setFormMessage('✅ Email verified!');
      } else {
        setFormMessage(result.message || '❌ Invalid OTP.');
      }
    } catch (err) {
      console.error(err);
      setFormMessage('❌ Server error while verifying OTP.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setFormMessage('❌ Please verify OTP before submitting.');
      return;
    }

    setFormMessage('Submitting application...');

    try {
      const res = await fetch(API.APPLY_INTERNSHIP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullname: formData.fullname,
          email: formData.email,
          resume_url: formData.resume_url,
          internship_code: selectedCode
        })
      });

      const result = await res.json();

      if (res.ok) {
        setFormMessage('✅ Application submitted successfully!');
        setTimeout(() => closeModal(), 1500);
      } else {
        setFormMessage(result.message || '❌ Submission failed.');
      }
    } catch (err) {
      console.error(err);
      setFormMessage('❌ Server error. Try again.');
    }
  };

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
            <button onClick={() => openApplyModal(internship.code, internship.title)}>Apply Now</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>Apply for Internship</h4>
            <form onSubmit={handleSubmit}>
              <input name="fullname" placeholder="Full Name" required value={formData.fullname} onChange={handleChange} />
              <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
              <button type="button" onClick={sendOtp} disabled={otpSent}>Send OTP</button>

              {otpSent && (
                <>
                  <input name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
                  <button type="button" onClick={verifyOtp} disabled={otpVerified}>Verify OTP</button>
                </>
              )}

              {otpVerified && (
                <>
                  <input name="resume_url" placeholder="Resume URL (Google Drive, etc)" value={formData.resume_url} onChange={handleChange} required />
                  <button type="submit">Submit Application</button>
                </>
              )}

              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
            {formMessage && <p className="form-message">{formMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Internships;
