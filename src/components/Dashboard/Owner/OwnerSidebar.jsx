// components/Dashboard/Owner/OwnerSidebar.jsx
import React from 'react';

function OwnerSidebar({ onSelect }) {
  return (
    <ul className="sidebar-list">
      <li onClick={() => onSelect('sign-in')}>Sign In As</li>
      {/* <li onClick={() => onSelect('manage-users')}>Manage Users</li> */}
      {/* <li onClick={() => onSelect('dashboard')}>View Dashboard</li> */}
      {/* <li onClick={() => onSelect('settings')}>Settings</li> */}
    </ul>
  );
}

export default OwnerSidebar;
