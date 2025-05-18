import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Login from './components/pages/Login';
import FirstLogin from './components/pages/FirstLogin';
import Dashboard from './components/pages/Dashboard';
import Error404 from './components/pages/Error404';
import PrivateRoute from './components/common/PrivateRoute';
import SessionExpired from './components/pages/SessionExpired';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/first-login" element={<FirstLogin />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;