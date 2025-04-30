import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Benvenuto nella Dashboard</h1>
      <p>Sei loggato come: {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
