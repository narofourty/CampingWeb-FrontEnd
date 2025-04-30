const API_URL = 'https://url.api'; // TODO: inserire l'endpoint

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;

  } catch (error) {
    console.error('Errore login:', error);
    throw new Error('Error during login. Check connection or server.');
  }
};
