import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams fetched:', data);
        
        // Handle both paginated and plain array responses
        const teamsList = data.results || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container mt-4"><div className="alert alert-info" role="alert"><strong>Loading...</strong> Fetching teams from the API.</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger" role="alert"><strong>Error:</strong> {error}</div></div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">Teams</h2>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="empty-state">
              <p>No teams found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(team => (
                    <tr key={team.id}>
                      <td><strong>{team.id}</strong></td>
                      <td>{team.name}</td>
                      <td>{team.description}</td>
                      <td>{team.created_date}</td>
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

export default Teams;
