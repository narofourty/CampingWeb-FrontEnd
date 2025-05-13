import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '@styles/app.css';
import logo from '../../assets/images/logo.png';

const Error404 = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="error-container">
      <div className="error-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <div className="error-code">404</div>
        <div className="error-title">Page not found</div>
        <div className="error-message">
          We couldn't find the page you're looking for.<br />
          Maybe it's gone camping?
        </div>
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="error-button">
          {isAuthenticated ? "Go to Dashboard" : "Login"}
        </Link>
      </div>
    </div>
  );
};

export default Error404;