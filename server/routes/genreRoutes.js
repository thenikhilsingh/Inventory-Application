const { Router } = require("express");
const Genre = require("../models/genres")

const genreRouter = Router();

genreRouter.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

genreRouter.post("/", async (req, res) => {
    try {
        const genre = new Genre(req.body)
        await genre.save()
        res.status(201).json(genre)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

genreRouter.put("/:id", async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!genre) {
            return res.status(400).json({ error: "genre not found" })
        }
        res.json(genre)
    }
    catch (err) {
        res.status(400).json({ error: err.message })

    }
})

genreRouter.delete("/:id", async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!genre) {
            return res.status(400).json({ error: "genre not found" })
        }
        res.json({
            message: "genre deleted"
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })

    }
})

module.exports = genreRouter;
