const express = require("express");

const {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  getOrdersByUserIdHandler,
  updateOrderHandler,
  deleteOrderHandler,
} = require("../handlers/orderHandler");

const router = express.Router();

// Create Order
router.post("/", createOrderHandler);

// Get All Orders
router.get("/", getAllOrdersHandler);

// Get Orders By User Id
router.get("/user/:userId", getOrdersByUserIdHandler);

// Get Order By Id
router.get("/:id", getOrderByIdHandler);

// Update Order
router.put("/:id", updateOrderHandler);

// Delete Order
router.delete("/:id", deleteOrderHandler);

module.exports = router;
