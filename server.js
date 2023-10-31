const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");

const app = express();
app.use(express.json());

// Database Connection
mongoose
  .connect(
    "mongodb+srv://liamsdatabrowser:br0HBxceCmZiIZQ4@cluster0.dpl3lsj.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
