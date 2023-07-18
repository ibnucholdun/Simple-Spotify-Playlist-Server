const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ibnucholdun:gigih3.0@cluster0.0k2a92a.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const playlistRoutes = require("./src/routes/playlistRoutes");

app.use("/api/playlist", playlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
