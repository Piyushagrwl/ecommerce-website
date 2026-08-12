import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() === "") return;

    navigate(`/products?search=${encodeURIComponent(search)}`);
    setSearch("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🛍 ShopEase</Link>
      </div>

      <form
        className="search"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          🔍
        </button>
      </form>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li><Link to="/products">Products</Link></li>

        <li><Link to="/cart">🛒 Cart</Link></li>

        <li><Link to="/orders">📦 Orders</Link></li>

        <li><Link to="/admin">⚙️ Admin</Link></li>
        <li>
  <Link to="/wishlist">
    ❤️ Wishlist
  </Link>
</li>

        {token ? (
          <li>
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              👤 Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;