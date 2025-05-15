import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { Trash2 } from 'lucide-react';
import '@styles/app.css';

const ProductComponent = () => {
  const { token } = useAuth();
  const { products, loading, error, deleteProduct } = useProducts(token);

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const openModal = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      closeModal();
    } catch (err) {
      alert(err.message || 'An error occurred while deleting the product.');
    }
  };

  if (loading) return <p>Loading...</p>;
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
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
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
              <td>
                <button
                  onClick={() => openModal(product.id)}
                  className="delete-btn"
                  title="Delete product"
                >
                  <Trash2 size={18} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmDelete}>Delete</button>
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;