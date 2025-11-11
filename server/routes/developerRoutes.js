const { Router } = require("express");
const Developer = require("../models/developers")

const developerRouter = Router();

developerRouter.get("/", async (req, res) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

developerRouter.post("/", async (req, res) => {
    try {
        const developer = new Developer(req.body)
        await developer.save()
        res.status(201).json(developer)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

developerRouter.put("/:id", async (req, res) => {
    try {
        const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!developer) {
            return res.status(400).json({ error: "developer not found" })
        }
        res.json(developer)
    }
    catch (err) {
        res.status(400).json({ error: err.message })

    }
})

developerRouter.delete("/:id", async (req, res) => {
    try {
        const developer = await Developer.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!developer) {
            return res.status(400).json({ error: "developer not found" })
        }
        res.json({
            message: "developer deleted"
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })

    }
})

module.exports = developerRouter;
