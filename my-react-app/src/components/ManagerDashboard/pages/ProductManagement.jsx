// src/components/ManagerDashboard/ProductManagement.jsx
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Package,
  Loader2
} from "lucide-react";
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  // New Product / Edit Modal state
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add / Update product
  const handleSave = async () => {
    try {
      if (!form.name || !form.price || !form.stock) {
        toast.error("All fields are required!");
        return;
      }

      if (editingProduct) {
        // update
        await axios.put(`/api/products/${editingProduct._id}`, form);
        toast.success("Product updated successfully");
      } else {
        // add new
        await axios.post("/api/products", form);
        toast.success("Product added successfully");
      }

      setForm({ name: "", price: "", stock: "" });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Error saving product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Package className="w-6 h-6" /> Product Management
      </h1>

      {/* Search + Add */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded px-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 outline-none"
          />
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({ name: "", price: "", stock: "" });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Form (Add/Edit) */}
      {(editingProduct || form.name || form.price || form.stock) && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="font-semibold mb-2">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setForm({ name: "", price: "", stock: "" });
                setEditingProduct(null);
              }}
              className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded shadow">
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">₹{p.price}</td>
                    <td className="p-2">{p.stock}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setForm({ name: p.name, price: p.price, stock: p.stock });
                        }}
                        className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded"
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="px-3 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
