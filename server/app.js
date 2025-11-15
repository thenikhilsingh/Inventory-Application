const express = require("express");
const envFile = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConfig.js");
const gameRouter = require("./routes/gameRoutes.js");
const genreRouter = require("./routes/genreRoutes.js");
const developerRouter = require("./routes/developerRoutes.js");

envFile.config();
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
