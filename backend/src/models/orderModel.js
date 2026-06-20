const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const orderCollection = () => {
  const db = getDB();
  return db.collection("orders");
};

// Create Order
const createOrder = async (orderData) => {
  return await orderCollection().insertOne(orderData);
};

// Get All Orders
const getAllOrders = async () => {
  return await orderCollection().find({}).toArray();
};

// Get Order By Id
const getOrderById = async (id) => {
  return await orderCollection().findOne({
    _id: new ObjectId(id),
  });
};

// Get Orders By User Id
const getOrdersByUserId = async (userId) => {
  return await orderCollection().find({
    userId: userId,
  }).toArray();
};

// Update Order
const updateOrder = async (id, orderData) => {
  return await orderCollection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: orderData,
    }
  );
};

// Delete Order
const deleteOrder = async (id) => {
  return await orderCollection().deleteOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
