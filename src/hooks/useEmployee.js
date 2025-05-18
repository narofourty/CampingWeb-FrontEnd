import { useEffect, useState, useCallback } from 'react';
import { fetchEmployee } from '../services/employeeService';

export const useEmployee = (username, token) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEmployee(username, token);
      setEmployee(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Errore nel caricamento del profilo.');
    } finally {
      setLoading(false);
    }
  }, [username, token]);

  useEffect(() => {
    if (username && token) loadEmployee();
  }, [username, token, loadEmployee]);

  return { employee, loading, error, reload: loadEmployee };
};