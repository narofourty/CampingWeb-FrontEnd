import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '@styles/app.css';

const SessionExpired = () => {
  const navigate = useNavigate();
  const { sessionExpired, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!sessionExpired || isAuthenticated) {
      navigate('/error404');
    }
  }, [sessionExpired, isAuthenticated, navigate]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="session-container">
      <div className="session-box">
        <h1 className="session-title">Oops!</h1>
        <p className="session-message">
          Your session has expired. Please log in again to continue.
        </p>
        <button className="session-button" onClick={handleGoBack}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;