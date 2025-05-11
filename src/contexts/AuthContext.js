import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, refreshToken } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      const parsedUserData = JSON.parse(userData);
      setUser({ ...parsedUserData, token });
    } else if (token) {
      setUser({ token });
    }
  }, []);

  useEffect(() => {
    if (!user?.token) return;

    const interval = setInterval(() => {
      refreshUserToken(user.token);
    }, 900000);

    return () => clearInterval(interval);
  }, [user?.token, refreshUserToken]);

  const login = async (username, password) => {
    const data = await loginService(username, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userData', JSON.stringify({ username }));
    setUser({ username, token: data.token });
    setSessionExpired(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
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