// components/Dashboard/HR/HRSidebar.jsx
import React from 'react';
import './HRSidebar.css';

function HRSidebar({ onSelect }) {
  return (
    <div className="hr-sidebar">
      <h3 className="sidebar-title">👩‍💼 HR Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('view-applicants')}>📄 View Applicants</li>
        <li onClick={() => onSelect('view-interns')}>👨‍🎓 View Interns</li>
        <li onClick={() => onSelect('edit-internship')}>📝 Edit Internship</li>
        <li onClick={() => onSelect('add-internship')}>🏆 Add Internship</li>
      </ul>
    </div>
  );
}

export default HRSidebar;
