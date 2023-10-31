const Thought = require("../models/Thought");

const thoughtController = {
  // Create a new thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.status(201).json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Retrieve all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieve a single thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by ID
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID" });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a thought by ID
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID" });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;

// Add a reaction to a thought
thoughtController.addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a reaction from a thought
thoughtController.removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = thoughtController;
