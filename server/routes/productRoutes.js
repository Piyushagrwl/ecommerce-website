const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProductById);

// Add product - protected
router.post("/", protect, addProduct);

// Update product - protected
router.put("/:id", protect, updateProduct);

// Delete product - protected
router.delete("/:id", protect, deleteProduct);

module.exports = router;