import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ShopPages.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        setOrders(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Could not load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="shop-page">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="shop-page">

      <h1 className="shop-title">
        📦 My Orders
      </h1>

      {message && (
        <p className="shop-message">
          {message}
        </p>
      )}

      {orders.length === 0 ? (

        <div className="empty-message">
          <h2>No orders yet</h2>
          <p style={{ marginTop: "10px" }}>
            Your placed orders will appear here.
          </p>
        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <div className="order-header">

                <div>
                  <h3>Order</h3>

                  <p className="order-id">
                    #{order._id}
                  </p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              <div>

                {order.items?.map((item) => (
                  <div
                    className="order-product"
                    key={item._id}
                  >
                    <strong>
                      {item.product?.name ||
                        "Product"}
                    </strong>

                    {" × "}

                    {item.quantity}

                    {item.product?.price && (
                      <span>
                        {" "}— ₹
                        {item.product.price *
                          item.quantity}
                      </span>
                    )}
                  </div>
                ))}

              </div>

              <div className="order-total">
                <strong>
                  Total: ₹{order.totalAmount}
                </strong>
              </div>

              {order.createdAt && (
                <p
                  style={{
                    marginTop: "12px",
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Ordered on:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;