const User = require("../models/User");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;

// Add a friend to a user's friend list
userController.addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No user found with this ID" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a friend from a user's friend list
userController.removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No user found with this ID" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = userController;
