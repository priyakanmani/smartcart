import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProduct(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mt-4 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Product not found</div>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: '500px' }}
            />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
              <span className="text-muted">No image available</span>
            </div>
          )}
        </div>
        
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          
          <h4 className="my-3">${product.price.toFixed(2)}</h4>
          
          <p className="lead">{product.description}</p>
          
          <div className="mb-3">
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <button className="btn btn-primary me-2">Add to Cart</button>
          
          {user?.isAdmin && (
            <>
              <Link to={`/products/edit/${product._id}`} className="btn btn-secondary me-2">
                Edit
              </Link>
              <Link to="/products" className="btn btn-outline-secondary">
                Back to Products
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;