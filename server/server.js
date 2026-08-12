const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const protect = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes=require("./routes/wishlistRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is Running Successfully 🚀");
});

// User Routes
app.use("/api/users", userRoutes);

// Protected Route
app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});