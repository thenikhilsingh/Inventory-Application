const express = require("express");
const envFile = require("dotenv")
envFile.config()
const connectDB = require("./config/dbConfig.js");
const Game = require("./models/games.js");
const Genre = require("./models/genres.js");
const Developer = require("./models/developers.js");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "";

try {
  connectDB(MONGODB_URI);
} catch (err) {
  console.log(err);
  process.exit(1);
}

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the server is listening on http://localhost:${PORT}/`);
});
