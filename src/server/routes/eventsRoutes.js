const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../middleware/upload");

// GET all
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch {
    res.status(404).json({ error: "Event not found" });
  }
});

// CREATE
router.post("/", upload.single("img"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const event = new Event({
      title: req.body.title,
      desc: req.body.desc,
      date: req.body.date,
      img: `/uploads/events/${req.file.filename}`,
    });

    await event.save();

    res.status(201).json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;