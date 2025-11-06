const express = require("express");
const envFile = require("dotenv")
const connectDB = require("./config/dbConfig.js");
const Game = require("./models/games.js");
const Genre = require("./models/genres.js");
const Developer = require("./models/developers.js");
const gameRouter = require("./routes/genreRoutes.js");
const genreRouter = require("./routes/gameRoutes.js");
const developerRouter = require("./routes/developerRoutes.js");

envFile.config()
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

app.use("/games", gameRouter);
app.use("/genres", genreRouter);
app.use("/developers", developerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the server is listening on http://localhost:${PORT}/`);
});
