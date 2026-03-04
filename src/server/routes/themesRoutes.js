const express = require("express");
const router = express.Router();
const Theme = require("../models/Theme");
const upload = require("../middleware/upload");

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
  } catch {
    res.status(404).json({ error: "Theme not found" });
  }
});


// CREATE theme (with image upload)
router.post("/", upload.single("img"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newTheme = new Theme({
      title: req.body.title,
      desc: req.body.desc,
      img: `/uploads/themes/${req.file.filename}`,
    });

    await newTheme.save();

    res.status(201).json(newTheme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// UPDATE theme (image optional)
router.put("/:id", upload.single("img"), async (req, res) => {
  try {

    const updateData = {
      title: req.body.title,
      desc: req.body.desc,
    };

    // if new image uploaded
    if (req.file) {
      updateData.img = `/uploads/themes/${req.file.filename}`;
    }

    const updated = await Theme.findByIdAndUpdate(
      req.params.id,
      updateData,
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