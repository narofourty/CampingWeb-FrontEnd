import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productService';

export const useProducts = (token) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts(token);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Error loading products.');
      } finally {
        setLoading(false);
      }
    };

    if (token) getProducts();
  }, [token]);

  return { products, loading, error };
};