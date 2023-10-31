const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Retrieve all users
router.get("/", userController.getAllUsers);

// Create a new user
router.post("/", userController.createUser);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;

// Route to add a friend to a user's friend list
router.post("/:userId/friends/:friendId", userController.addFriend);

// Route to remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", userController.removeFriend);

module.exports = router;
