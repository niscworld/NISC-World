import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppWrapper from '../context/AppWrapper.jsx';
import API from '../api/MainApi.js';
import { logout } from '../utils/Logout.jsx';

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
  const navigate = useNavigate();

  const [role, setRole] = useState(null); // null = not checked yet
  const [selectedTab, setSelectedTab] = useState('');
  const [commonTabSelected, setCommonTabSelected] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const position = localStorage.getItem('position');

    if (!token || !user_id || !position) {
      navigate('/login');
      return;
    }

    fetch(API.WHOAMI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, user_id, role: position }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRole(position);
        } else {
          logout().then(() => navigate('/login'));
        }
      })
      .catch(err => {
        console.error('[WHOAMI ERROR]', err);
        logout().then(() => navigate('/login'));
      });
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const commonSidebar = () => (
    <div className="common-sidebar">
      <div className="profile-section">
        <div className="profile-pic">👤</div>
        <div className="profile-details">
          <span>{localStorage.getItem('fullname')}</span>
          <br />
          <small>{localStorage.getItem('user_id') || 'User'} • {role}</small>
        </div>
      </div>
      <ul className="common-links">
        <li onClick={() => {
          setCommonTabSelected('view-profile');
          setSelectedTab('');
          setSidebarOpen(false);
        }}>
          👁️ View Profile
        </li>
        <li onClick={() => {
          setCommonTabSelected('edit-profile');
          setSelectedTab('');
          setSidebarOpen(false);
        }}>
          ✏️ Edit Profile
        </li>
        <li onClick={() => {
          setCommonTabSelected('change-password');
          setSelectedTab('');
          setSidebarOpen(false);
        }}>
          🔒 Change Password
        </li>
        <li className="logout" onClick={handleLogout}>
          🚪 Logout
        </li>
      </ul>
    </div>
  );

  const renderSidebar = () => {
    let roleSidebar;
    const handleTabSelect = (tab) => {
      setSelectedTab(tab);
      setCommonTabSelected('');
      setSidebarOpen(false);
    };

    switch (role) {
      case 'Developer':
        roleSidebar = <DeveloperSidebar onSelect={handleTabSelect} />;
        break;
      case 'Owner':
        roleSidebar = <OwnerSidebar onSelect={handleTabSelect} />;
        break;
      case 'Intern':
        roleSidebar = <InternSidebar onSelect={handleTabSelect} />;
        break;
      case 'HR':
        roleSidebar = <HRSidebar onSelect={handleTabSelect} />;
        break;
      default:
        roleSidebar = <div className="sidebar">No Access</div>;
    }

    return (
      <div className={`sidebar-panel ${sidebarOpen ? 'open' : ''}`}>
        <div className="combined-sidebar">
          {commonSidebar()}
          <div className="role-sidebar">{roleSidebar}</div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!role) return <div className="content-panel">Loading...</div>;

    if (commonTabSelected === 'view-profile') return <ViewProfile />;
    if (commonTabSelected === 'edit-profile') return <EditProfile />;
    if (commonTabSelected === 'change-password') return <ChangePassword />;

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
        {!sidebarOpen && (
          <div className="dashboard-header">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
        )}
        {renderSidebar()}
        {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        <div className="content-panel">{renderContent()}</div>
      </div>
    </AppWrapper>
  );
}

export default Dashboard;
