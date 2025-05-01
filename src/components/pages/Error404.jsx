import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Error.css';
import logo from '../../assets/images/logo.png';

const Error404 = () => {
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
        <Link to="/" className="error-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Error404;