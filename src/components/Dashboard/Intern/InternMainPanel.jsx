// components/Dashboard/Intern/InternMainPanel.jsx
import React, { useEffect, useState } from 'react';

function InternMainPanel({ selectedTab }) {
  const [data, setData] = useState(null);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!selectedTab) return;

    fetch('/api/dashboard/intern', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, tab: selectedTab }),
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error('Error fetching intern data:', err));
  }, [selectedTab]);

  if (!selectedTab) return <div>Select a tab</div>;
  if (!data) return <div>Loading {selectedTab}...</div>;

  return (
    <div>
      <h2>{selectedTab.replace('-', ' ').toUpperCase()}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default InternMainPanel;
