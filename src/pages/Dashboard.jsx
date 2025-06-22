import React, { useEffect, useState } from 'react';

import AppWrapper from '../context/AppWrapper.jsx';

import DeveloperSidebar from './../components/Dashboard/Developer/DeveloperSidebar.jsx';
import DeveloperMainPanel from './../components/Dashboard/Developer/DeveloperMainPanel.jsx';
import OwnerSidebar from './../components/Dashboard/Owner/OwnerSidebar.jsx';
import OwnerMainPanel from './../components/Dashboard/Owner/OwnerMainPanel.jsx';
import InternSidebar from './../components/Dashboard/Intern/InternSidebar.jsx';
import InternMainPanel from './../components/Dashboard/Intern/InternMainPanel.jsx';
import HRSidebar from '../components/Dashboard/HR/HRSidebar.jsx';
import HRMainPanel from '../components/Dashboard/HR/HRMainPanel.jsx';

import './Dashboard.css';

function Dashboard() {
  const [role, setRole] = useState('');
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    const position = localStorage.getItem('position');
    setRole(position || '');
  }, []);

  const commonSidebar = () => (
    <div className="common-sidebar">
      <div className="profile-section">
        <div className="profile-pic">👤</div>
        <div className="profile-details">
          <span>{localStorage.getItem('user_id') || 'User'}</span>
          <br />
          <small>{role}</small>
        </div>
      </div>
      <ul className="common-links">
        <li onClick={() => setSelectedTab('profile')}>👁️ View Profile</li>
        <li onClick={() => setSelectedTab('edit-profile')}>✏️ Edit Profile</li>
        <li
          className="logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
        >
          🚪 Logout
        </li>
      </ul>
    </div>
  );

  const renderSidebar = () => {
    let roleSidebar;
    switch (role) {
      case 'Developer':
        roleSidebar = <DeveloperSidebar onSelect={setSelectedTab} />;
        break;
      case 'Owner':
        roleSidebar = <OwnerSidebar onSelect={setSelectedTab} />;
        break;
      case 'Intern':
        roleSidebar = <InternSidebar onSelect={setSelectedTab} />;
        break;
      case 'HR':
        roleSidebar = <HRSidebar onSelect={setSelectedTab} />;
        break;
      default:
        roleSidebar = <div className="sidebar">No Access</div>;
    }

    return (
      <div className="combined-sidebar">
        {commonSidebar()}
        <div className="role-sidebar">{roleSidebar}</div>
      </div>
    );
  };

  const renderContent = () => {
    switch (role) {
      case 'Developer':
        return <DeveloperMainPanel selectedTab={selectedTab} />;
      case 'Owner':
        return <OwnerMainPanel selectedTab={selectedTab} />;
      case 'Intern':
        return <InternMainPanel selectedTab={selectedTab} />;
      case 'HR':
        return <HRMainPanel selectedTab={selectedTab} />;
      default:
        return <div className="content-panel">No content</div>;
    }
  };

  return (
    <AppWrapper>
      <div className="dashboard-container">
        <div className="sidebar-panel">{renderSidebar()}</div>
        <div className="content-panel">{renderContent()}</div>
      </div>
    </AppWrapper>
  );
}

export default Dashboard;
