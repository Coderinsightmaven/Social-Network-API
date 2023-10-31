
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Retrieve all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
