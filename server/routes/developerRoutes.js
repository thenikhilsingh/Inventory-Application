const { Router } = require("express");
const Developer = require("../models/developers");
const {
  validationResult,
  validationDeveloper,
} = require("../controllers/developerController");

const developerRouter = Router();

developerRouter.get("/", async (req, res) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

developerRouter.post("/", validationDeveloper, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const developer = new Developer(req.body);
    await developer.save();
    res.status(201).json(developer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

developerRouter.put("/:id", validationDeveloper, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const developer = await Developer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!developer) {
      return res.status(400).json({ error: "developer not found" });
    }
    res.json(developer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

developerRouter.delete("/:id", async (req, res) => {
  try {
    const developer = await Developer.findByIdAndDelete(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!developer) {
      return res.status(400).json({ error: "developer not found" });
    }
    res.json({
      message: "developer deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = developerRouter;
