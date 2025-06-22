import React from 'react';

function HRSidebar({ onSelect }) {
  return (
    <div>
      <h3>HR Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('view-applicants')}>View Applicants</li>
      </ul>
    </div>
  );
}

export default HRSidebar;
