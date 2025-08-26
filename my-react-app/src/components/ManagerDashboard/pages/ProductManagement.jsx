import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiShoppingCart } from 'react-icons/fi';

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    barcode: '',
    image: ''
  });
  
  // Add state for shop info
  const [shopInfo, setShopInfo] = useState({
    id: '',
    name: '',
    email: ''
  });

  // Mock data for development
  const mockProducts = [
    {
      _id: '1',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 89.99,
      stock: 45,
      description: 'High-quality wireless headphones with noise cancellation',
      barcode: '1234567890123',
      image: 'https://via.placeholder.com/150',
      shop: 'shop-1'
    },
    {
      _id: '2',
      name: 'Organic Apples',
      category: 'Groceries',
      price: 4.99,
      stock: 120,
      description: 'Fresh organic apples from local farm',
      barcode: '2345678901234',
      image: 'https://via.placeholder.com/150',
      shop: 'shop-1'
    },
    {
      _id: '3',
      name: 'Men\'s T-Shirt',
      category: 'Clothing',
      price: 24.99,
      stock: 32,
      description: 'Comfortable cotton t-shirt for men',
      barcode: '3456789012345',
      image: 'https://via.placeholder.com/150',
      shop: 'shop-1'
    }
  ];

  // Fetch products from the backend or use mock data
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from the actual API
        const response = await fetch('http://localhost:5000/api/products');
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
          
          // Extract categories
          const uniqueCategories = [...new Set(data.map(product => product.category))];
          setCategories(uniqueCategories);
        } else {
          // If API fails, use mock data
          console.warn('API not available, using mock data');
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
          
          const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching products, using mock data:', error);
        // Use mock data as fallback
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        
        const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
        setCategories(uniqueCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Retrieve shop info from localStorage
  useEffect(() => {
    const retrieveShopInfo = () => {
      try {
        // Get data from localStorage
        const managerUser = localStorage.getItem('managerUser');
        const managerEmail = localStorage.getItem('managerEmail');
        
        console.log('📋 LocalStorage data retrieved:');
        console.log('managerUser:', managerUser);
        console.log('managerEmail:', managerEmail);
        
        if (managerUser && managerUser !== '{}') {
          try {
            const userData = JSON.parse(managerUser);
            console.log('📦 Parsed user data from localStorage:', userData);
            
            // Set shop info
            setShopInfo({
              id: userData.shopId || userData.shop?._id || '',
              name: userData.shopName || userData.shop?.name || '',
              email: userData.email || managerEmail || ''
            });
            
            // Also log to console
            console.log('🏪 Shop Information:');
            console.log('Shop ID:', userData._id || userData.shop?._id || 'Not available');
            console.log('Shop Name:', userData.shopName || userData.shop?.name || 'Not available');
            console.log('Email:', userData.email || managerEmail || 'Not available');
            
          } catch (error) {
            console.error("❌ Error parsing user data:", error);
          }
        } else if (managerEmail) {
          // If we only have email
          setShopInfo({
            id: '',
            name: '',
            email: managerEmail
          });
          
          console.log('🏪 Shop Information:');
          console.log('Email:', managerEmail);
          console.log('Shop ID: Not available');
          console.log('Shop Name: Not available');
        } else {
          console.log('❌ No manager data found in localStorage');
        }
      } catch (error) {
        console.error('Error retrieving shop info from localStorage:', error);
      }
    };

    retrieveShopInfo();
  }, []);

  // Rest of your component code remains the same...
  // Filter products based on search and category
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle product submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Try to update via API
        try {
          const response = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {
            const updatedProduct = await response.json();
            setProducts(products.map(product => 
              product._id === updatedProduct._id ? updatedProduct : product
            ));
          } else {
            throw new Error('API update failed');
          }
        } catch (error) {
          // Fallback to local update
          console.warn('API update failed, updating locally:', error);
          setProducts(products.map(product => 
            product._id === editingProduct._id ? { ...product, ...formData } : product
          ));
        }
      } else {
        // Try to create via API
        try {
          const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, shop: shopInfo.id || 'shop-1'}),
          });
          
          if (response.ok) {
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
          } else {
            throw new Error('API create failed');
          }
        } catch (error) {
          // Fallback to local create
          console.warn('API create failed, creating locally:', error);
          const newProduct = {
            _id: Date.now().toString(),
            ...formData,
            shop: shopInfo.id || 'shop-1'
          };
          setProducts([...products, newProduct]);
        }
      }
      
      // Reset form and close modal
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        barcode: '',
        image: ''
      });
      setShowAddModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // The rest of your component code (handleEdit, handleDelete, and JSX) remains the same...
  // Handle product editing
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      barcode: product.barcode || '',
      image: product.image || ''
    });
    setShowAddModal(true);
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Try to delete via API
        try {
          const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            setProducts(products.filter(product => product._id !== productId));
          } else {
            throw new Error('API delete failed');
          }
        } catch (error) {
          // Fallback to local delete
          console.warn('API delete failed, deleting locally:', error);
          setProducts(products.filter(product => product._id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Product Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg flex items-center">
            <FiShoppingCart className="text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">
              {filteredProducts.length} products found
            </span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barcode
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          {product.image ? (
                            <img className="h-20 w-20 rounded-md object-cover" src={product.image} alt={product.name} />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <FiShoppingCart className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.barcode || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit2 className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    description: '',
                    barcode: '',
                    image: ''
                  });
                }}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Electronics, Groceries"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      min="0"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      min="0"
                      required
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    id="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Optional product description"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      category: '',
                      price: '',
                      stock: '',
                      description: '',
                      barcode: '',
                      image: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;