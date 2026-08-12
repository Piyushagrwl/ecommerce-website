import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/ShopPages.css";

function Cart() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // GET CART
  const fetchCart = async () => {
    try {
      const response = await API.get("/cart");
      setCart(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // UPDATE QUANTITY
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await API.put("/cart", {
        productId,
        quantity,
      });

      setCart(response.data.cart);
      setMessage("Cart Updated");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not update cart"
      );
    }
  };

  // REMOVE PRODUCT
  const removeProduct = async (productId) => {
    try {
      const response = await API.delete(
        `/cart/${productId}`
      );

      setCart(response.data.cart);
      setMessage("Product Removed");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not remove product"
      );
    }
  };

  // PLACE ORDER
  const placeOrder = async () => {
    try {
      const response = await API.post("/orders");

      alert(response.data.message);

      setCart({
        ...cart,
        items: [],
      });

      navigate("/orders");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not place order"
      );
    }
  };

  if (loading) {
    return (
      <div className="shop-page">
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  const items = cart?.items || [];

  const totalPrice = items.reduce((total, item) => {
    return (
      total +
      (item.product?.price || 0) * item.quantity
    );
  }, 0);

  return (
    <div className="shop-page">

      <h1 className="shop-title">
        🛒 Shopping Cart
      </h1>

      {message && (
        <p className="shop-message">
          {message}
        </p>
      )}

      {items.length === 0 ? (

        <div className="empty-message">
          <h2>Your cart is empty</h2>

          <p style={{ marginTop: "10px" }}>
            Add some products to continue shopping.
          </p>

          <button
            className="cart-btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>

      ) : (

        <div className="cart-layout">

          {/* LEFT SIDE — CART PRODUCTS */}

          <div className="cart-items">

            {items.map((item) => (
              <div
                className="cart-item"
                key={item.product?._id}
              >

                <div className="cart-item-info">

                  <h2>
                    {item.product?.name}
                  </h2>

                  <p className="cart-item-price">
                    ₹{item.product?.price}
                  </p>

                </div>

                {/* QUANTITY */}

                <div className="quantity-controls">

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span className="quantity-number">
                    {item.quantity}
                  </span>

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* ITEM TOTAL */}

                <div>
                  <strong>
                    ₹
                    {(
                      (item.product?.price || 0) *
                      item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>

                {/* REMOVE */}

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeProduct(
                      item.product._id
                    )
                  }
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <p>
              Items:{" "}
              {items.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </p>

            <div className="cart-total">

              <span>Total</span>

              <span>
                ₹{totalPrice.toFixed(2)}
              </span>

            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>

            <button
              className="secondary-btn"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
              onClick={() =>
                navigate("/products")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;