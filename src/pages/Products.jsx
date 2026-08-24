import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import "../styles/ShopPages.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
const searchFromNavbar = searchParams.get("search");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let data = [...products];

    // Category Filter
    if (selectedCategory) {
      data = data.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() ===
            selectedCategory.toLowerCase()
      );
    }

    // Search
    const searchText = search || searchFromNavbar || "";

if (searchText) {
  data = data.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
    }

    // Sorting
    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setFilteredProducts(data);
  }, [products, search, sort, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Could not load products");
    }
  };

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
  const addToWishlist = async (productId) => {
    try {
      const response = await API.post("/wishlist", {
        productId,
      });
  
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Please login first"
      );
    }
  };

  return (
    <div className="shop-page">
      <h1 className="shop-title">
        Our Products
      </h1>

      <div className="shop-controls">

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="sort-box"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort Products
          </option>

          <option value="low">
            Price: Low → High
          </option>

          <option value="high">
            Price: High → Low
          </option>

          <option value="name">
            A → Z
          </option>
        </select>

      </div>

      {selectedCategory && (
        <h3 className="category-title">
          Category : {selectedCategory}
        </h3>
      )}

      {message && (
        <p className="shop-message">
          {message}
        </p>
      )}

      {filteredProducts.length === 0 ? (
        <div className="empty-message">
          <h2>No Products Found</h2>
        </div>
      ) : (
        <div className="products-grid">

          {filteredProducts.map((product) => (

            <div
              className="shop-product-card"
              key={product._id}
            >

              <div className="shop-product-image">

                {product.image ? (
                  <img
                  src={`https://shopease-backend-53gd.onrender.com${product.image}`}
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

                <p className="product-category">
                  {product.category}
                </p>

                <div className="product-actions">

  <Link
    className="view-btn"
    to={`/product/${product._id}`}
  >
    View
  </Link>

  <button
    className="cart-btn"
    onClick={() =>
      addToCart(product._id)
    }
  >
    Cart
  </button>

  <button
    className="wishlist-btn"
    onClick={() =>
      addToWishlist(product._id)
    }
  >
    ❤️
  </button>

</div>
              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}

export default Products;