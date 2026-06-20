const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const productCollection = () => {
  const db = getDB();
  return db.collection("products");
};

// Create Product
const createProduct = async (productData) => {
  return await productCollection().insertOne(productData);
};

// Get All Products
const getAllProducts = async () => {
  return await productCollection().find({}).toArray();
};

// Get Product By Id
const getProductById = async (id) => {
  return await productCollection().findOne({
    _id: new ObjectId(id),
  });
};

// Update Product
const updateProduct = async (id, productData) => {
  return await productCollection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: productData,
    }
  );
};

// Delete Product
const deleteProduct = async (id) => {
  return await productCollection().deleteOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
