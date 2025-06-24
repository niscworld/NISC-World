import React, { useEffect, useState } from 'react';
import API from '../../../api/MainApi';
import CreateUserForm from './CreateUserForm';
import CreateInternshipForm from './CreateInternshipForm';



function DeveloperMainPanel({ selectedTab }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('position');



  async function checkAccess(){
    if (!selectedTab) return;
    console.log(data)
    setData(null);

    setLoading(true);
    fetch(`${API.DASHBOARD_DEVELOPER_ENDPOINT}/${selectedTab}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, token, role }),
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => {
        console.error('Error fetching developer data:', err);
        setData({ error: 'Failed to load data.' });
      })
      .finally(() => setLoading(false));
}


  useEffect(() => {
    checkAccess();
  }, [selectedTab]);

  const showContent = () => {
    if (loading) return <p>Loading...</p>;
    if (data?.error) return <p className="error">{data.error}</p>;

    // console.log(data)
    // checkAccess();

    switch (selectedTab) {
      case 'view-users':
        return (
          <div className="dev-table-wrapper">
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
                {data!=null && data.map && data.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.user_id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'create-user':
        return <CreateUserForm />;

      case 'create-internship':
        return <CreateInternshipForm />;

      default:
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
  };

  if (!selectedTab) return <div>Select a tab</div>;

  return (
    <div className="main-panel">
      <h2 className="main-panel-heading">{selectedTab.replace(/-/g, ' ').toUpperCase()}</h2>
      {showContent()}
    </div>
  );
}

export default DeveloperMainPanel;
