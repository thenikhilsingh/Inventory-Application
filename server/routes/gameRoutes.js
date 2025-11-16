const { Router } = require("express");
const Game = require("../models/games");
const {
  validationResult,
  validationGame,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
  try {
    const games = await Game.find().populate("genres").populate("developers");
    res.json(games);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

gameRouter.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate("genres")
      .populate("developers");

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

gameRouter.post("/", validationGame, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

gameRouter.put("/:id", validationGame, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      return res.status(400).json({ error: "game not found" });
    }
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

gameRouter.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      return res.status(400).json({ error: "game not found" });
    }
    res.json({
      message: "game deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = gameRouter;
