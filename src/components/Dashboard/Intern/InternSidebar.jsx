// components/Dashboard/Intern/InternSidebar.jsx
import React from 'react';

function InternSidebar({ onSelect }) {
  return (
    <div>
      <h3>Intern Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('tasks')}>Assigned Tasks</li>
        <li onClick={() => onSelect('submit-work')}>Submit Work</li>
        <li onClick={() => onSelect('progress')}>Progress</li>
      </ul>
    </div>
  );
}

export default InternSidebar;
