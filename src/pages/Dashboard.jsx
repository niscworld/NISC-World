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

import ViewProfile from './../components/sections/ViewProfile/ViewProfile.jsx';
import EditProfile from './../components/sections/EditProfile/EditProfile.jsx';
import ChangePassword from './../components/sections/ChangePassword/ChangePassword.jsx';

import './Dashboard.css';

function Dashboard() {
  const [role, setRole] = useState('');
  const [selectedTab, setSelectedTab] = useState('');
  const [commonTabSelected, setCommonTabSelected] = useState('');

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
        <li
          onClick={() => {
            setCommonTabSelected('view-profile');
            setSelectedTab('');
          }}
        >
          👁️ View Profile
        </li>
        <li
          onClick={() => {
            setCommonTabSelected('edit-profile');
            setSelectedTab('');
          }}
        >
          ✏️ Edit Profile
        </li>
        <li
          onClick={() => {
            setCommonTabSelected('change-password');
            setSelectedTab('');
          }}
        >
          🔒 Change Password
        </li>
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
        roleSidebar = <DeveloperSidebar onSelect={(tab) => {
          setSelectedTab(tab);
          setCommonTabSelected('');
        }} />;
        break;
      case 'Owner':
        roleSidebar = <OwnerSidebar onSelect={(tab) => {
          setSelectedTab(tab);
          setCommonTabSelected('');
        }} />;
        break;
      case 'Intern':
        roleSidebar = <InternSidebar onSelect={(tab) => {
          setSelectedTab(tab);
          setCommonTabSelected('');
        }} />;
        break;
      case 'HR':
        roleSidebar = <HRSidebar onSelect={(tab) => {
          setSelectedTab(tab);
          setCommonTabSelected('');
        }} />;
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
    if (commonTabSelected === 'view-profile') {
      return <ViewProfile />;
    }

  if (commonTabSelected === 'edit-profile') {
    return <EditProfile />;
  }

  if (commonTabSelected === 'change-password') {
    return <ChangePassword />;
  }

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
