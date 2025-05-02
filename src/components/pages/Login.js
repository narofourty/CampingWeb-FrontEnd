import React, { useState } from 'react';
import '../../assets/styles/Login.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorKey, setErrorKey] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password); 
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed');
      setErrorKey((prev) => prev + 1);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input 
              type="text"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="input-field" 
              placeholder="username" 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="input-field" 
              placeholder="password" 
              required 
            />
          </div>
          {errorMessage && ( <div key={errorKey} className="login-error-message"> {errorMessage} </div> )}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;