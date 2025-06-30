// components/Dashboard/Intern/InternMainPanel.jsx
import React from 'react';
import ViewMyInternship from './ViewMyInternship.jsx';
import InternMessages from './InternMessages.jsx';
import SubmitAssignment from './SubmitAssignment.jsx';

import './InternMainPanel.css';

function InternMainPanel({ selectedTab }) {
  const renderContent = () => {
    switch (selectedTab) {
      case 'view-my-internship':
        return <ViewMyInternship />;
      case 'view-messages':
        return <InternMessages />;
      case 'submit-assignment':
        return <SubmitAssignment />
      default:
        return <div className="intern-panel-message">Select a valid tab</div>;
    }
  };

  if (!selectedTab) return <div className="intern-panel-message">Select a tab</div>;

  const formatTab = (tab) => tab.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="intern-main-panel">
      <h2 className="intern-heading">{formatTab(selectedTab)}</h2>
      <div className="intern-panel-content">{renderContent()}</div>
    </div>
  );
}

export default InternMainPanel;
