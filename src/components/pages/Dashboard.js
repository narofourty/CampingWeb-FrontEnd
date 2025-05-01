import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../assets/styles/Error.css';
import logo from '../../assets/images/logo.png';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="error-container">
      <div className="error-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <div className="error-code">👋</div>
        <h1>Ciao, {user?.name || 'utente'}!</h1>
        <div className="error-message">
          Benvenuto nella tua dashboard personale.<br />
          Da qui potrai gestire il tuo account e molto altro.
        </div>
        <button onClick={logout} className="error-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;