const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../middleware/upload");

// ================= GET ALL =================

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET SINGLE =================

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch {
    res.status(404).json({ error: "Event not found" });
  }
});

// ================= CREATE =================

router.post("/", upload.single("img"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    let days = [];

    if (req.body.days) {
      try {
        days = JSON.parse(req.body.days);
      } catch {
        days = [];
      }
    }

    const event = new Event({
      title: req.body.title,
      date: req.body.date,
      days: days,
      img: `/uploads/events/${req.file.filename}`,
    });

    await event.save();

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= UPDATE =================

router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      date: req.body.date,
    };

    if (req.body.days) {
      try {
        updateData.days = JSON.parse(req.body.days);
      } catch {}
    }

    if (req.file) {
      updateData.img = `/uploads/events/${req.file.filename}`;
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================= DELETE =================

router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;