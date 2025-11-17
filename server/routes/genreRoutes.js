const { Router } = require("express");
const Genre = require("../models/genres");
const {
  validationResult,
  validationGenre,
} = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

genreRouter.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

genreRouter.post("/", validationGenre, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const genre = new Genre(req.body);
    await genre.save();
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

genreRouter.put("/:id", validationGenre, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!genre) {
      return res.status(400).json({ error: "genre not found" });
    }
    res.json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

genreRouter.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!genre) {
      return res.status(400).json({ error: "genre not found" });
    }
    res.json({
      message: "genre deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = genreRouter;
