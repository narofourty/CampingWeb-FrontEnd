import React, { useState } from 'react';
import '../../assets/styles/Login.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  const recaptchaRef = React.createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (failedAttempts >= 5 && !captchaVerified) {
      setErrorMessage('You have tried to login too many times.\nPlease complete the CAPTCHA.');
      setErrorKey(prevKey => prevKey + 1);
      return;
    }

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setFailedAttempts(failedAttempts + 1);
      setErrorMessage(error.message || 'Login failed');
      setErrorKey(prevKey => prevKey + 1);

      if (failedAttempts + 1 >= 5) {
        setErrorMessage('You have tried to login too many times.\nPlease complete the CAPTCHA.');
      }
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaVerified(value !== null);
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

          {errorMessage && (
            <div key={errorKey} className="login-error-message">
              {errorMessage.split("\n").map((str, index) => (
                <React.Fragment key={index}>
                  {str}
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}

          {failedAttempts >= 5 && (
            <div className="captcha-container">
              <ReCAPTCHA
                sitekey="creare-key-su-Google-ReCAPTCHA" //TODO: Google ReCaptcha
                onChange={onCaptchaChange}
                ref={recaptchaRef}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={failedAttempts >= 5 && !captchaVerified}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;