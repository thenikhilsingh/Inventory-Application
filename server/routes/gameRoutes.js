const { Router } = require("express");

const genreRouter = Router();

genreRouter.get("/", (req, res) => res.send("All Genres are here"));

module.exports = genreRouter;
