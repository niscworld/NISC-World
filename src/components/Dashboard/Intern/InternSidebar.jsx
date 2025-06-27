// components/Dashboard/Intern/InternSidebar.jsx
import React from 'react';

function InternSidebar({ onSelect, selectedTab }) {
  return (
    <div className="intern-sidebar">
      <h3>🧑‍💻 Intern Panel</h3>
      <ul className="sidebar-list">
        <li
          className={selectedTab === 'view-my-internship' ? 'active' : ''}
          onClick={() => onSelect('view-my-internship')}
        >
          📄 View My Internship
        </li>
        <li
          className={selectedTab === 'view-messages' ? 'active' : ''}
          onClick={() => onSelect('view-messages')}
        >
          💬 View Messages
        </li>
      </ul>
    </div>
  );
}

export default InternSidebar;
