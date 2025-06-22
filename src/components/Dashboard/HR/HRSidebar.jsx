import React from 'react';
import './HRSidebar.css';

function HRSidebar({ onSelect }) {
  return (
    <div className="hr-sidebar">
      <h3 className="sidebar-title">👩‍💼 HR Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('view-applicants')}>📄 View Applicants</li>
        {/* Add more menu items here in the future */}
      </ul>
    </div>
  );
}

export default HRSidebar;
