const express = require("express");

const {
  createProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandler");

const router = express.Router();

// Create Product
router.post("/", createProductHandler);

// Get All Products
router.get("/", getAllProductsHandler);

// Get Product By Id
router.get("/:id", getProductByIdHandler);

// Update Product
router.put("/:id", updateProductHandler);

// Delete Product
router.delete("/:id", deleteProductHandler);

module.exports = router;
