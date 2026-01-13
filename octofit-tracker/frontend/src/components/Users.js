import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching Users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users fetched:', data);
        
        // Handle both paginated and plain array responses
        const usersList = data.results || data;
        setUsers(Array.isArray(usersList) ? usersList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container mt-4"><div className="alert alert-info" role="alert"><strong>Loading...</strong> Fetching users from the API.</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger" role="alert"><strong>Error:</strong> {error}</div></div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">Users</h2>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="empty-state">
              <p>No users found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td><strong>{user.id}</strong></td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
