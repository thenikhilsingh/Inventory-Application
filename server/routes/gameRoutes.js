const { Router } = require("express");
const Game = require("../models/games")

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

gameRouter.post("/", async (req, res) => {
    try {
        const game = new Game(req.body)
        await game.save()
        res.status(201).json(game)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

gameRouter.put("/:id", async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!game) {
            return res.status(400).json({ error: "game not found" })
        }
        res.json(game)
    }
    catch (err) {
        res.status(400).json({ error: err.message })

    }
})

gameRouter.delete("/:id", async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!game) {
            return res.status(400).json({ error: "game not found" })
        }
        res.json({
            message: "game deleted"
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })

    }
})

module.exports = gameRouter;
