import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>🛍 ShopEase</h2>
          <p>
            Your one-stop destination for quality
            products at great prices.
          </p>
        </div>

        <div>
          <h3>Shop</h3>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <div>
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/signup">Create Account</Link>
        </div>

        <div>
          <h3>Customer Care</h3>
          <p>Secure Shopping</p>
          <p>Easy Ordering</p>
          <p>Quality Products</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ShopEase. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;