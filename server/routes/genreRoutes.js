const { Router } = require("express");

const gameRouter = Router();

gameRouter.get("/", (req, res) => res.send("All Games are here"));

module.exports = gameRouter;
