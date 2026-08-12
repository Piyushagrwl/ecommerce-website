import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Admin.css";

function Admin() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Could not load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const editProduct = (product) => {
    setEditingId(product._id);
  
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
  
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setForm({
        ...form,
        image: response.data.image,
      });
  
      setMessage("✅ Image Uploaded");
  
    } catch (error) {
      console.error(error);
  
      setMessage("❌ Image Upload Failed");
    }
  };
  const addProduct = async (e) => {
    e.preventDefault();
  
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.category
    ) {
      setMessage("❌ Please fill all required fields");
      return;
    }
  
    try {
      setLoading(true);
      setMessage("");
  
      if (editingId) {
        await API.put(`/products/${editingId}`, {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
  
        setMessage("✅ Product Updated Successfully");
      } else {
        await API.post("/products", {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
  
        setMessage("✅ Product Added Successfully");
      }
  
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
  
      setEditingId(null);
  
      fetchProducts();
  
    } catch (error) {
      console.error(error);
  
      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      setMessage("✅ Product deleted successfully");

      await fetchProducts();
    } catch (error) {
      setMessage(
        "❌ " +
          (error.response?.data?.message ||
            "Could not delete product")
      );
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-heading">
        <span className="admin-label">
          ADMIN PANEL
        </span>

        <h1>Admin Dashboard</h1>

        <p>
          Manage products in your ShopEase store.
        </p>
      </div>

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

      <div className="admin-stats">
        <div className="stat-card">
          <span>📦</span>

          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>

          <div>
            <p>Low Stock</p>

            <h2>
              {
                products.filter(
                  (product) =>
                    Number(product.stock) <= 5
                ).length
              }
            </h2>
          </div>
        </div>
      </div>

      <div className="admin-section">

        <div className="section-heading">
          <h2>Add New Product</h2>

          <p>
            Enter product information below.
          </p>
        </div>

        <form
          className="product-form"
          onSubmit={addProduct}
        >

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Home">
                Home
              </option>

              <option value="Beauty">
                Beauty
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Books">
                Books
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="200"
              required
            />
          </div>

          <div className="form-group">
            <label>Stock</label>

            <input
              type="number"
              name="stock"
              min="0"
              value={form.stock}
              onChange={handleChange}
              placeholder="12"
            />
          </div>

          <div className="form-group full-width">
            <label>Image URL</label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <div className="form-group full-width">
  <label>Product Image</label>

  <input
    type="file"
    accept="image/*"
    onChange={uploadImage}
  />

  {form.image && (
    <img
      src={`http://localhost:5001${form.image}`}
      alt="Preview"
      width="120"
      style={{
        marginTop: "10px",
        borderRadius: "8px",
      }}
    />
  )}
</div>

          <button
            type="submit"
            className="add-product-btn"
            disabled={loading}
          >
           {loading
  ? "Saving..."
  : editingId
  ? "Update Product"
  : "+ Add Product"}
          </button>

        </form>
      </div>

      <div className="admin-section">

        <div className="section-heading">
          <h2>Manage Products</h2>

          <p>
            {products.length} products available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="admin-empty">
            No products available.
          </div>
        ) : (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {products.map((product) => (
                  <tr key={product._id}>

                    <td>
                      <strong>
                        {product.name}
                      </strong>
                    </td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>
                      {product.stock}
                    </td>

                    <td>
  <button
    className="edit-btn"
    onClick={() => editProduct(product)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteProduct(product._id)}
  >
    Delete
  </button>
</td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default Admin;
