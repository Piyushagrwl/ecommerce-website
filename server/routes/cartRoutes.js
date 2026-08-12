const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");


// Add product
router.post("/", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update quantity
router.put("/", protect, updateCartItem);

// Remove product
router.delete("/:productId", protect, removeFromCart);

module.exports = router;