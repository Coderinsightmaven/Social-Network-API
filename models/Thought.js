
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280 // Typical length for a social media post
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
      // Define a Reaction schema here or as a separate model if reactions are complex
    }
  ]
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
