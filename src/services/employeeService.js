export const fetchEmployee = async (username, token) => {
  const response = await fetch(`http://localhost:8080/employee?username=${username}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Token': token
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    try {
      errorMessage = JSON.parse(errorText).message;
    } catch {
      errorMessage = errorText;
    }
    throw new Error(errorMessage || 'Errore nel recupero dei dati dell\'employee.');
  }

  return response.json();
};