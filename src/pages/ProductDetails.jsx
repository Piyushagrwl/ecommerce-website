import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/ShopPages.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setMessage("Product could not be loaded");
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await API.post("/cart", {
        productId: id,
        quantity: 1,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Please login first"
      );
    }
  };

  if (!product) {
    return (
      <div className="shop-page">
        <h2>{message || "Loading Product..."}</h2>
      </div>
    );
  }

  return (
    <div className="shop-page">

      <div className="product-details-card">

        {/* PRODUCT IMAGE */}
        <div className="details-image">
          {product.image ? (
            <img
            src={`http://localhost:5001${product.image}`}
              alt={product.name}
            />
          ) : (
            <span>📦</span>
          )}
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="details-info">

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description ||
              "No description available for this product."}
          </p>

          <h2 className="details-price">
            ₹{product.price}
          </h2>

          <p className="details-meta">
            <strong>Category:</strong>{" "}
            {product.category || "General"}
          </p>

          <p className="details-meta">
            <strong>Stock:</strong>{" "}
            {product.stock}
          </p>

          {product.stock > 0 ? (
            <p
              className="details-meta"
              style={{ color: "green" }}
            >
              ✓ In Stock
            </p>
          ) : (
            <p
              className="details-meta"
              style={{ color: "red" }}
            >
              Out of Stock
            </p>
          )}

          <div className="details-buttons">

            <button
              className="cart-btn"
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/products")}
            >
              ← Back to Products
            </button>

          </div>

          {message && (
            <p
              className="shop-message"
              style={{ marginTop: "20px" }}
            >
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;