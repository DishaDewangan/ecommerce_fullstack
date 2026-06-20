const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../models/productModel");

const createProductService = async (productData) => {
  if (!productData.name) {
    throw new Error("Product name is required");
  }

  if (!productData.price) {
    throw new Error("Price is required");
  }

  if (productData.price < 0) {
    throw new Error("Price must be positive");
  }

  return await createProduct(productData);
};

const getAllProductsService = async () => {
  return await getAllProducts();
};

const getProductByIdService = async (id) => {
  if (!id) {
    throw new Error("Product id is required");
  }

  return await getProductById(id);
};

const updateProductService = async (id, productData) => {
  if (!id) {
    throw new Error("Product id is required");
  }

  if (!productData.name) {
    throw new Error("Product name is required");
  }

  if (!productData.price) {
    throw new Error("Price is required");
  }

  if (productData.price < 0) {
    throw new Error("Price must be positive");
  }

  return await updateProduct(id, productData);
};

const deleteProductService = async (id) => {
  if (!id) {
    throw new Error("Product id is required");
  }

  return await deleteProduct(id);
};

module.exports = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
