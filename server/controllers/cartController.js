const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    // Create cart if user doesn't have one
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    // Check if product already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    cart = await cart.populate("items.product");

    res.status(200).json({
      message: "Product Added To Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE PRODUCT QUANTITY
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (Number(quantity) < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product Not Found In Cart",
      });
    }

    item.quantity = Number(quantity);

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    res.status(200).json({
      message: "Cart Updated Successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    res.status(200).json({
      message: "Product Removed From Cart",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
};