import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { createFirstUser } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import '@styles/app.css';

const FirstLogin = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const data = await createFirstUser(form);
      loginWithToken(data.token, form);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Error while creating the user.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Create First User</h1>
        <form onSubmit={handleSubmit}>
          {['name', 'surname', 'username', 'password', 'email'].map((field) => (
            <div className="input-group" key={field}>
              <label className="input-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="input-field"
                placeholder={field}
                required
              />
            </div>
          ))}
          {errorMessage && <div className="login-error-message">{errorMessage}</div>}
          <button type="submit" className="login-button">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default FirstLogin;