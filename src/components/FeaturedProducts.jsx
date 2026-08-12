import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/FeaturedProducts.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        // Show only first 4 products
        setProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error(error);
        setMessage("Could not load featured products");
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await API.post("/cart", {
        productId,
        quantity: 1,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Please login before adding to cart"
      );
    }
  };

  return (
    <section className="featured">
      <div className="featured-header">
        <div>
          <span className="featured-label">
            FEATURED
          </span>

          <h2>Featured Products</h2>

          <p>
            Discover some of our most popular products.
          </p>
        </div>

        <Link
          to="/products"
          className="featured-view-all"
        >
          View All Products →
        </Link>
      </div>

      {message && (
        <p className="featured-message">
          {message}
        </p>
      )}

      {products.length === 0 ? (
        <div className="no-featured-products">
          No products available.
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div
              className="featured-product-card"
              key={product._id}
            >
              <Link
                to={`/product/${product._id}`}
                className="featured-image-link"
              >
                <div className="featured-product-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : (
                    <span>📦</span>
                  )}
                </div>
              </Link>

              <div className="featured-product-info">
                <span className="featured-category">
                  {product.category || "Product"}
                </span>

                <Link
                  to={`/product/${product._id}`}
                  className="featured-product-name"
                >
                  {product.name}
                </Link>

                <div className="featured-product-bottom">
                  <strong>
                    ₹{product.price}
                  </strong>

                  <button
                    onClick={() =>
                      addToCart(product._id)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;