import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ShopPages.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  const fetchWishlist = async () => {
    try {
      const response = await API.get("/wishlist");
      setWishlist(response.data?.products || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not load wishlist"
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);

      setWishlist((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      alert("Could not remove product");
    }
  };

  return (
    <div className="shop-page">
      <h1 className="shop-title">❤️ My Wishlist</h1>

      {message && <p>{message}</p>}

      {wishlist.length === 0 ? (
        <h3>No products in wishlist.</h3>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <div
              className="shop-product-card"
              key={product._id}
            >
              <div className="shop-product-image">
                {product.image ? (
                  <img
                  src={`http://localhost:5001${product.image}`}
                    alt={product.name}
                  />
                ) : (
                  <span>📦</span>
                )}
              </div>

              <div className="shop-product-info">
                <h2>{product.name}</h2>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <button
                  className="cart-btn"
                  onClick={() =>
                    removeWishlist(product._id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
