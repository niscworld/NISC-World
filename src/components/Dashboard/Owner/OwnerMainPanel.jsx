import React, { useState, useEffect } from 'react';
import SignInAs from "./SignInAs.jsx";

import './OwnerMainPanel.css';

function OwnerMainPanel({ selectedTab }) {

  // Render the appropriate content based on selectedTab
  const renderContent = () => {
    switch (selectedTab) {
      case 'sign-in':
        return <SignInAs />
      default:
        return <div className="owner-panel-message">Select a valid tab</div>;
    }
  };

  if (!selectedTab) return <div className="owner-panel-message">Select a tab</div>;

  return (
    <div className="owner-main-panel">
      <h2 className="owner-heading">{selectedTab.replace('-', ' ').toUpperCase()}</h2>
      <div className="owner-panel-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default OwnerMainPanel;
