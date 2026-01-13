import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts fetched:', data);
        
        // Handle both paginated and plain array responses
        const workoutsList = data.results || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-4"><div className="alert alert-info" role="alert"><strong>Loading...</strong> Fetching workouts from the API.</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger" role="alert"><strong>Error:</strong> {error}</div></div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">Workouts</h2>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="empty-state">
              <p>No workouts found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Duration (minutes)</th>
                    <th>Calories Burned</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map(workout => (
                    <tr key={workout.id}>
                      <td><strong>{workout.id}</strong></td>
                      <td>{workout.name}</td>
                      <td>{workout.duration}</td>
                      <td>{workout.calories_burned}</td>
                      <td>{workout.date}</td>
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

export default Workouts;
