import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { Trash2, PlusCircle } from 'lucide-react';
import '@styles/app.css';

const ProductComponent = () => {
  const { token } = useAuth();
  const { products, loading, error, deleteProduct, addProduct } = useProducts(token);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });


  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      closeDeleteModal();
    } catch (err) {
      alert(err.message || 'An error occurred while deleting the product.');
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description || '',
      });
      setShowAddModal(false);
      setNewProduct({ name: '', price: '', description: '' });
    } catch (err) {
      alert(err.message || 'An error occurred while creating the product.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="product-header">
        <h2 className="content-title">Product List</h2>
        <button className="edit-button" onClick={() => setShowAddModal(true)}>
          <PlusCircle size={18} />
          <span>Add Product</span>
        </button>
      </div>

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
                  onClick={() => openDeleteModal(product.id)}
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

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmDelete}>Delete</button>
              <button className="cancel-button" onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddSubmit} className="add-form">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleAddChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price (€)"
                value={newProduct.price}
                onChange={handleAddChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description (optional)"
                value={newProduct.description}
                onChange={handleAddChange}
                rows={3}
              />
              <div className="modal-actions">
                <button type="submit" className="save-button">Add</button>
                <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;