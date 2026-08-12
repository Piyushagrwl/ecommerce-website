import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ id, name, price, description }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <span>📦</span>
      </div>

      <div className="product-info">

        <h3>{name}</h3>

        {description && (
          <p className="product-description">
            {description}
          </p>
        )}

        <p className="product-price">
          ₹{price}
        </p>

        <div className="product-actions">

          {id && (
            <Link
              to={`/product/${id}`}
              className="view-btn"
            >
              View Product
            </Link>
          )}

          <button className="add-cart-btn">
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;