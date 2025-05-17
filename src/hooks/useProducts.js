import { useEffect, useState, useCallback } from 'react';
import {
  fetchAllProducts,
  deleteProduct as deleteProductService,
  createProduct as createProductService,
  updateProduct as updateProductService
} from '../services/productService';

export const useProducts = (token) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
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
  }, [token]);

  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id, token);
      setProducts((prev) => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error deleting product.');
    }
  };

  const addProduct = async (product) => {
    try {
      const createdProduct = await createProductService(product, token);
      setProducts((prev) => [...prev, createdProduct]);
    } catch (err) {
      console.error(err);
      setError('Error creating product.');
      throw err;
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const result = await updateProductService(updatedProduct, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === result.id ? result : p))
      );
    } catch (err) {
      console.error(err);
      setError('Error updating product.');
      throw err;
    }
  };

  useEffect(() => {
    if (token) loadProducts();
  }, [token, loadProducts]);

  return { products, loading, error, deleteProduct, addProduct, updateProduct };
};