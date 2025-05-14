export const fetchAllProducts = async (token) => {
  const response = await fetch('http://localhost:8080/product/all', {
    method: 'GET',
    headers: {
      Token: `${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    try {
      errorMessage = JSON.parse(errorText).message;
    } catch {
      errorMessage = errorText;
    }
    throw new Error(errorMessage || 'Error retrieving products.');
  }

  return response.json();
};