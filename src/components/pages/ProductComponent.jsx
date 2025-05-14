import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import '@styles/app.css';

const ProductComponent = () => {
  const { token } = useAuth();
  const { products, loading, error } = useProducts(token);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="content-title">Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Start Data</th>
            <th>End Data</th>
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