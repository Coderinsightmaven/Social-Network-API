const express = require("express");
const router = express.Router();
const thoughtController = require("../controllers/thoughtController");

// Create a new thought
router.post("/", thoughtController.createThought);

// Retrieve all thoughts
router.get("/", thoughtController.getAllThoughts);

// Retrieve a single thought by ID
router.get("/:id", thoughtController.getThoughtById);

// Update a thought by ID
router.put("/:id", thoughtController.updateThought);

// Delete a thought by ID
router.delete("/:id", thoughtController.deleteThought);

module.exports = router;

// Route to add a reaction to a thought
router.post("/:thoughtId/reactions", thoughtController.addReaction);

// Route to remove a reaction from a thought
router.delete(
  "/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

module.exports = router;
