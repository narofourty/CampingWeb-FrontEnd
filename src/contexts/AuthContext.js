import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
   
  const login = async (username, password) => {
    const data = await loginService(username, password);
    localStorage.setItem('token', data.token);
    setUser({ username, token: data.token });
  };

  const loginWithToken = (token, userData = {}) => {
    const fullUser = { ...userData, token };
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };  

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loginWithToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);