import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProductComponent = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.1.67:8080/product/all', {
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
          throw new Error(errorMessage || 'Errore nel recupero dei prodotti.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Errore nel recupero dei prodotti:', err);
        setError('Errore nel caricamento dei prodotti.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="content-title">Lista Prodotti</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Prezzo</th>
            <th>Data Inizio</th>
            <th>Data Fine</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name || 'N/A'}</td>
              <td>{product.price} €</td>
              <td>{product.startDate?.split('T')[0]}</td>
              <td>{product.endDate?.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductComponent;