// components/Dashboard/Developer/DeveloperMainPanel.jsx
import React, { useEffect, useState } from 'react';
import API from "./../../../api/MainApi";
import CreateUserForm from './CreateUserForm'; // ✅ Add this
import CreateInternshipForm from './CreateInternshipForm'; // ✅ Add this

function showContent(data, selectedTab) {
  if (selectedTab === 'view-users') {
    return (
      <table className="dev-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr key={idx}>
              <td>{user.user_id}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (selectedTab === 'create-user') {
    return <CreateUserForm />;
  } else if (selectedTab === 'create-internship') {
    return <CreateInternshipForm />;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}


function DeveloperMainPanel({ selectedTab }) {
  const [data, setData] = useState(null);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!selectedTab) return;

    fetch(`${API.DASHBOARD_DEVELOPER_ENDPOINT}/${selectedTab}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error('Error fetching developer data:', err));
  }, [selectedTab]);

  if (!selectedTab) return <div>Select a tab</div>;
  if (!data) return <div>Loading {selectedTab}...</div>;

  return (
    <div>
      <h2>{selectedTab.replace('-', ' ').toUpperCase()}</h2>
      <span>{showContent(data, selectedTab)}</span>
    </div>
  );
}

export default DeveloperMainPanel;
