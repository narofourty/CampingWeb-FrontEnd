import { useEffect, useState } from 'react';
import { fetchAllProducts, deleteProduct as deleteProductService } from '../services/productService';

export const useProducts = (token) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
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

  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id, token);
      setProducts((prev) => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error deleting product.');
    }
  };

  useEffect(() => {
    if (token) loadProducts();
  }, [token]);

  return { products, loading, error, deleteProduct };
};
