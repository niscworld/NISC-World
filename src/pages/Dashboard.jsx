import React, { useEffect, useState } from 'react';
import DeveloperSidebar from './../components/Dashboard/Developer/DeveloperSidebar.jsx';
import DeveloperMainPanel from './../components/Dashboard/Developer/DeveloperMainPanel.jsx';
import OwnerSidebar from './../components/Dashboard/Owner/OwnerSidebar.jsx';
import OwnerMainPanel from './../components/Dashboard/Owner/OwnerMainPanel.jsx';
import InternSidebar from './../components/Dashboard/Intern/InternSidebar.jsx';
import InternMainPanel from './../components/Dashboard/Intern/InternMainPanel.jsx';
import HRSidebar from '../components/Dashboard/HR/HRSidebar.jsx';
import HRMainPanel from '../components/Dashboard/HR/HRMainPanel.jsx';
// 🔄 Import more roles as needed

import './Dashboard.css'; // Add styling later

function Dashboard() {
  const [role, setRole] = useState('');
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    const position = localStorage.getItem('position');
    setRole(position || '');
  }, []);

  const renderSidebar = () => {
    switch (role) {
      case 'Developer':
        return <DeveloperSidebar onSelect={setSelectedTab} />;
      case 'Owner':
        return <OwnerSidebar onSelect={setSelectedTab} />;
      case 'Intern':
        return <InternSidebar onSelect={setSelectedTab} />;
      case 'HR':
        return <HRSidebar onSelect={setSelectedTab} />;
      // 🔄 Add more roles
      default:
        return <div className="sidebar">No Access</div>;
    }
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
      // 🔄 Add more roles
      default:
        return <div className="content-panel">No content</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-panel">{renderSidebar()}</div>
      <div className="content-panel">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
