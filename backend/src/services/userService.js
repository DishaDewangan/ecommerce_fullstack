const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../models/userModel");

const createUserService = async (userData) => {
  if (!userData.name) {
    throw new Error("Name is required");
  }

  if (!userData.email) {
    throw new Error("Email is required");
  }

  return await createUser(userData);
};

const getAllUsersService = async () => {
  return await getAllUsers();
};

const getUserByIdService = async (id) => {
  if (!id) {
    throw new Error("User id is required");
  }

  return await getUserById(id);
};

const updateUserService = async (id, userData) => {
  if (!id) {
    throw new Error("User id is required");
  }

  if (!userData.name) {
    throw new Error("Name is required");
  }

  if (!userData.email) {
    throw new Error("Email is required");
  }

  return await updateUser(id, userData);
};

const deleteUserService = async (id) => {
  if (!id) {
    throw new Error("User id is required");
  }

  return await deleteUser(id);
};

module.exports = {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};