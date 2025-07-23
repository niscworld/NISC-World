import React, { useEffect, useState } from 'react';
import API from './../../../api/MainApi';
import './EditInternship.css';

function EditInternship() {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [message, setMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('position');

    if (!user_id || !token || !role) {
      setMessage('User credentials missing. Please log in again.');
      return;
    }

    setIsLoading(true);
    setMessage('Loading internships...');

    const requestData = { user_id, token, role };

    try {
      const res = await fetch(API.GET_INTERNSHIPS_DETAILS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        setInternships(Array.isArray(data) ? data : []);
        setMessage('');
      } else {
        setMessage(data.message || 'Failed to load internships.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error while fetching internships.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (internship) => {
    setSelectedInternship({
      ...internship,
      is_visible: internship.is_visible ?? true,
      can_join: internship.can_join ?? true,
    });
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSelectedInternship((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleUpdate = async () => {
    if (!selectedInternship) return;

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('position');

    if (!user_id || !token || !role) {
      setMessage('User not authenticated. Please log in.');
      return;
    }

    setIsUpdating(true);
    setMessage('Updating internship...');

    const updatedData = {
      ...selectedInternship,
      user_id,
      token,
      role,
    };

    try {
      const res = await fetch(API.UPDATE_INTERNSHIPS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Internship updated successfully.');
        fetchInternships();
        setSelectedInternship(null);
      } else {
        setMessage(result.message || '❌ Failed to update internship.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error during update.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmClose = async () => {
    console.log('Closing internship:', selectedInternship);
    if (!selectedInternship || !selectedInternship.code) {
      setMessage('❌ Internship code missing.');
      return;
    }

    setIsClosing(true);
    setShowConfirmModal(false);
    setMessage('Closing internship...');

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('position');

    if (!user_id || !token || !role) {
      setMessage('User not authenticated. Please log in.');
      return;
    }


    try {
      const res = await fetch(API.CLOSE_INTERNSHIP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          internship_code: selectedInternship.code,
          user_id,
          token,
          role,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Internship closed successfully.');
        fetchInternships();
        setSelectedInternship(null);
      } else {
        setMessage(result.message || '❌ Failed to close internship.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error while closing internship.');
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div className="edit-internship">
      <h3>Edit Internships</h3>
      {message && <p className="status">{message}</p>}

      {!selectedInternship ? (
        isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ul className="intern-list">
            {internships.length === 0 ? (
              <li>No internships found.</li>
            ) : (
              internships.map((intern) => (
                <li
                  key={intern.id}
                  className="intern-card"
                  onClick={() => handleSelect(intern)}
                >
                  <h3>{intern.title}</h3>
                  <p>{intern.department}</p>
                  <button>Edit</button>
                </li>
              ))
            )}
          </ul>
        )
      ) : (
        <div className="modal-content">
          <button className="back-button" onClick={() => setSelectedInternship(null)}>🔙</button>
          <h4>Edit: {selectedInternship.title}</h4>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <label>
              Title
              <input name="title" value={selectedInternship.title} onChange={handleChange} required />
            </label>

            <label>
              Description
              <textarea name="description" value={selectedInternship.description} onChange={handleChange} required />
            </label>

            <label>
              Department
              <input name="department" value={selectedInternship.department} onChange={handleChange} required />
            </label>

            <label>
              Duration
              <input name="duration" value={selectedInternship.duration} onChange={handleChange} required />
            </label>

            <label>
              Location
              <input name="location" value={selectedInternship.location} onChange={handleChange} required />
            </label>

            <label>
              Stipend
              <input name="stipend" value={selectedInternship.stipend} onChange={handleChange} />
            </label>

            <label>
              HR ID
              <input name="hr_profile_id" value={selectedInternship.hr_profile_id || ''} onChange={handleChange} required />
            </label>

            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="is_visible" checked={selectedInternship.is_visible} onChange={handleChange} />
                Visible on internship page
              </label>
              <label>
                <input type="checkbox" name="can_join" checked={selectedInternship.can_join} onChange={handleChange} />
                Can Join
              </label>
            </div>

            <div className="modal-actions">
              <button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="close-button danger"
                onClick={() => setShowConfirmModal(true)}
                disabled={isClosing}
              >
                {isClosing ? 'Closing...' : '❌ Close Internship Completely'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <p>⚠️ Are you sure you want to <strong>permanently close</strong> this internship?</p>
            <div className="confirm-actions">
              <button onClick={handleConfirmClose} className="danger">Yes, Close</button>
              <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditInternship;
