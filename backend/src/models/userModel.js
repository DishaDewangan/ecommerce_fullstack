const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const userCollection = () => {
  const db = getDB();
  return db.collection("users");
};

// Create User
const createUser = async (userData) => {
  return await userCollection().insertOne(userData);
};

// Get All Users
const getAllUsers = async () => {
  return await userCollection().find({}).toArray();
};

// Get User By Id
const getUserById = async (id) => {
  return await userCollection().findOne({
    _id: new ObjectId(id),
  });
};

// Update User
const updateUser = async (id, userData) => {
  return await userCollection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: userData,
    }
  );
};

// Delete User
const deleteUser = async (id) => {
  return await userCollection().deleteOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};