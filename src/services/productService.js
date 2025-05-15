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

export const deleteProduct = async (id, token) => {
  const response = await fetch(`http://localhost:8080/product?id=${id}`, {
    method: 'DELETE',
    headers: {
      Token: `${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    let message = 'Error deleting product.';
    try {
      message = JSON.parse(text).message || message;
    } catch {
      message = text || message;
    }
    throw new Error(message);
  }
};

export const createProduct = async (product, token) => {
  const response = await fetch('http://localhost:8080/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Token': `${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const text = await response.text();
    let message = 'Error creating product.';
    try {
      message = JSON.parse(text).message || message;
    } catch {
      message = text || message;
    }
    throw new Error(message);
  }

  return response.json();
};
