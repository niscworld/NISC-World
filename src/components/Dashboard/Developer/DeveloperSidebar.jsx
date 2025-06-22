import React from 'react';
import "./DeveloperSidebar.css";

function DeveloperSidebar({ onSelect }) {
  return (
    <div className="role-sidebar-container">
      <h3 className="role-sidebar-heading">👨‍💻 Developer Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('view-users')}>👁️ View Users</li>
        <li onClick={() => onSelect('create-user')}>➕ Create User</li>
        <li onClick={() => onSelect('create-internship')}>📌 Create Internship</li>
      </ul>
    </div>
  );
}

export default DeveloperSidebar;
