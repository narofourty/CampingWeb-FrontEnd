import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, refreshToken } from '../services/authService';

const AuthContext = createContext();

const getInitialAuthState = () => {
  const token = sessionStorage.getItem('token');
  const userData = sessionStorage.getItem('userData');

  try {
    const parsedUser = userData ? JSON.parse(userData) : {};
    return token ? { ...parsedUser, token } : null;
  } catch (error) {
    console.error('Error parsing userData from sessionStorage:', error);
    return token ? { token } : null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialAuthState());
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  const refreshUserToken = useCallback(async (token) => {
    try {
      const data = await refreshToken(token);
      localStorage.setItem('token', data.token);
      setUser((prev) => ({
        ...prev,
        token: data.token,
      }));
      setSessionExpired(false);
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUser(null);
      setSessionExpired(true);
      navigate('/session-expired');
    }
  }, [navigate]);

  useEffect(() => {
    if (!user?.token) return;

    const interval = setInterval(() => {
      refreshUserToken(user.token);
    }, 900000);

    return () => clearInterval(interval);
  }, [user?.token, refreshUserToken]);

  const login = async (username, password) => {
    try {
      const data = await loginService(username, password);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('userData', JSON.stringify({ username }));
      localStorage.setItem('activeItem', 'home'); // reset scheda attiva
      setUser({ username, token: data.token });
      setSessionExpired(false);
      navigate('/dashboard/home', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    localStorage.removeItem('activeItem');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, sessionExpired, token: user?.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);