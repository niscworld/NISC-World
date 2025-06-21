// components/Dashboard/Developer/DeveloperSidebar.jsx
import React from 'react';

function DeveloperSidebar({ onSelect }) {
  return (
    <div>
      <h3>Developer Panel</h3>
      <ul className="sidebar-list">
        <li onClick={() => onSelect('view-users')}>VIEW USERS</li>
        <li onClick={() => onSelect('create-user')}>CREATE USER</li>
        <li onClick={() => onSelect('create-internship')}>CREATE INTERNSHIP</li>
      </ul>
    </div>
  );
}

export default DeveloperSidebar;
