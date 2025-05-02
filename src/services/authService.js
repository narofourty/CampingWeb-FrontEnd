const API_URL = 'http://192.168.1.9:8080/auth';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        errorMessage = JSON.parse(errorText).message;
      } catch {
        errorMessage = errorText;
      }
      throw new Error(errorMessage || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const createFirstUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/createFirstUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        errorMessage = JSON.parse(errorText).message;
      } catch {
        errorMessage = errorText;
      }
      throw new Error(errorMessage || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};