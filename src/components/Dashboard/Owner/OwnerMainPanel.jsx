// components/Dashboard/Owner/OwnerMainPanel.jsx
import React, { useEffect, useState } from 'react';

function OwnerMainPanel({ selectedTab }) {
  const [data, setData] = useState(null);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!selectedTab) return;

    fetch('/api/dashboard/owner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, tab: selectedTab }),
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error('Error fetching owner data:', err));
  }, [selectedTab]);

  if (!selectedTab) return <div>Please select a section</div>;
  if (!data) return <div>Loading {selectedTab}...</div>;

  return (
    <div>
      <h2>{selectedTab.replace('-', ' ').toUpperCase()}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* ✅ You can replace <pre> with styled UI components later */}
    </div>
  );
}

export default OwnerMainPanel;
