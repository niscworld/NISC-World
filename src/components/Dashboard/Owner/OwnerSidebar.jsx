// components/Dashboard/Owner/OwnerSidebar.jsx
import React from 'react';

function OwnerSidebar({ onSelect }) {
  return (
    <div>
      <h3>Owner Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('overview')}>Overview</li>
        <li onClick={() => onSelect('manage-users')}>Manage Users</li>
        <li onClick={() => onSelect('reports')}>Reports</li>
        <li onClick={() => onSelect('settings')}>Settings</li>
      </ul>
    </div>
  );
}

export default OwnerSidebar;
