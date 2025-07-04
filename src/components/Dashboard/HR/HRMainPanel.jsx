import React from 'react';
import ViewApplicantsTable from './ViewApplicantsTable.jsx';
import ViewInterns from './ViewInterns.jsx';
import ViewInternsSubmissions from './ViewInternsSubmissions.jsx';
import AddInternship from './AddInternship.jsx';
import EditInternship from './EditInternship.jsx';

import "./HRMainPanel.css";

function HRMainPanel({ selectedTab }) {
  const renderContent = () => {
    switch (selectedTab) {
      case 'view-applicants':
        return <ViewApplicantsTable />;
      case 'view-interns':
        return <ViewInterns />
      case 'view-interns-submissions':
        return <ViewInternsSubmissions />
      case 'add-internship':
        return <AddInternship />
      case 'edit-internship':
        return <EditInternship />
      // You can add more HR-specific tabs here in the future
      default:
        return <div className="hr-panel-message">Select a valid tab</div>;
    }
  };

  if (!selectedTab) return <div className="hr-panel-message">Select a tab</div>;

  return (
    <div className="hr-main-panel">
      <h2 className="hr-heading">{selectedTab.replace('-', ' ').toUpperCase()}</h2>
      <div className="hr-panel-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default HRMainPanel;
