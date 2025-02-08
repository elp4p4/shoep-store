const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProducts,
} = require("../controllers/productController");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  deleteOrder,
} = require("../controllers/orderController");
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/userController");

// Product routes
router.route("/products").get(getProducts).post(protect, admin, createProduct);
router.get("/products/search", searchProducts);
router
  .route("/products/:id")
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
  .get(getProductById);

// Order routes
router
  .route("/orders")
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route("/orders/myorders").get(protect, getUserOrders);

router.route("/orders/:id").get(protect, getOrderById);
router.route("/orders/:id").delete(protect, admin, deleteOrder);

// User routes
router.route("/users").get(protect, admin, getAllUsers);
router
  .route("/users/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
