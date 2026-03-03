const express = require("express");
const router = express.Router();
const Theme = require("../models/Theme");

// GET all themes
router.get("/", async (req, res) => {
  try {
    const themes = await Theme.find().sort({ createdAt: -1 });
    res.json(themes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single theme
router.get("/:id", async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    res.json(theme);
  } catch (err) {
    res.status(404).json({ error: "Theme not found" });
  }
});

// CREATE theme
router.post("/", async (req, res) => {
  try {
    const newTheme = new Theme(req.body);
    await newTheme.save();
    res.status(201).json(newTheme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE theme
router.put("/:id", async (req, res) => {
  try {
    const updated = await Theme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE theme
router.delete("/:id", async (req, res) => {
  try {
    await Theme.findByIdAndDelete(req.params.id);
    res.json({ message: "Theme deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;