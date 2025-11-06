const { Router } = require("express");

const developerRouter = Router();

developerRouter.get("/", (req, res) => res.send("All Developers are here"));

module.exports = developerRouter;
