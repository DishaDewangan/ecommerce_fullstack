const express = require("express");

const {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../handlers/userHandler");

const router = express.Router();

// Create User
router.post("/", createUserHandler);

// Get All Users
router.get("/", getAllUsersHandler);

// Get User By Id
router.get("/:id", getUserByIdHandler);

// Update User
router.put("/:id", updateUserHandler);

// Delete User
router.delete("/:id", deleteUserHandler);

module.exports = router;