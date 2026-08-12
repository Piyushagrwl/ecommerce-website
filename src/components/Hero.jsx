import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">

        <span className="hero-badge">
          ✨ New Collection 2026
        </span>

        <h1>
          Discover Products
          <span> You'll Love</span>
        </h1>

        <p>
          Shop premium products at great prices.
          Discover electronics, fashion, accessories
          and much more — all in one place.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-shop-btn"
            onClick={() => navigate("/products")}
          >
            Shop Now →
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>
        </div>

        <div className="hero-features">
          <div>
            <strong>✓</strong>
            Secure Shopping
          </div>

          <div>
            <strong>✓</strong>
            Quality Products
          </div>

          <div>
            <strong>✓</strong>
            Easy Ordering
          </div>
        </div>

      </div>

      <div className="hero-visual">
        <div className="hero-circle">
          <span>🛍️</span>
        </div>

        <div className="floating-card card-one">
          📦 Premium Products
        </div>

        <div className="floating-card card-two">
          ⭐ Great Quality
        </div>
      </div>
    </section>
  );
}

export default Hero;