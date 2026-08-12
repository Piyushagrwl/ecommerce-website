import { useNavigate } from "react-router-dom";
import "../styles/Categories.css";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Electronics",
      icon: "💻",
      description: "Latest gadgets & devices",
    },
    {
      name: "Fashion",
      icon: "👕",
      description: "Trending styles",
    },
    {
      name: "Home",
      icon: "🏠",
      description: "Everything for your home",
    },
    {
      name: "Beauty",
      icon: "✨",
      description: "Beauty & personal care",
    },
    {
      name: "Sports",
      icon: "⚽",
      description: "Sports & fitness",
    },
    {
      name: "Books",
      icon: "📚",
      description: "Explore great reads",
    },
  ];

  const openCategory = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="categories">

      <div className="categories-header">
        <div>
          <span className="section-label">
            COLLECTIONS
          </span>

          <h2>Shop by Category</h2>

          <p>
            Browse products from your favourite categories.
          </p>
        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/products")}
        >
          View All Products →
        </button>
      </div>

      <div className="category-container">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category.name}
            onClick={() => openCategory(category.name)}
          >
            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.name}</h3>

            <p>{category.description}</p>

            <span className="category-arrow">
              Explore →
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Categories;