// components/Dashboard/HR/HRMainPanel.jsx
import React from 'react';
import ViewApplicantsTable from './ViewApplicantsTable.jsx';

function HRMainPanel({ selectedTab }) {
  function showContent(tab) {
    if (tab === 'view-applicants') {
      return <ViewApplicantsTable />;
    }
    return <div>Select a valid tab</div>;
  }

  if (!selectedTab) return <div>Select a tab</div>;

  return (
    <div>
      <h2>{selectedTab.replace('-', ' ').toUpperCase()}</h2>
      <div>{showContent(selectedTab)}</div>
    </div>
  );
}

export default HRMainPanel;
