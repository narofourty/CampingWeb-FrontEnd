import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: verificare token lato backend o decodificarlo (se JWT)
      setUser({ token });
    }
  }, []);

  const login = async (username, password) => {
    const data = await loginService(username, password);
    localStorage.setItem('token', data.token);
    setUser({ username, token: data.token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);