const express = require("express");
const router = express.Router();
const Sponsor = require("../models/Sponsor");
const upload = require("../middleware/upload");


// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.json(sponsors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= CREATE =================
router.post("/", upload.single("img"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const sponsor = new Sponsor({
      name: req.body.name,
      img: `/uploads/sponsors/${req.file.filename}`,
    });

    await sponsor.save();

    res.status(201).json(sponsor);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ================= UPDATE =================
router.put("/:id", upload.single("img"), async (req, res) => {
  try {

    const updateData = {
      name: req.body.name,
    };

    if (req.file) {
      updateData.img = `/uploads/sponsors/${req.file.filename}`;
    }

    const updated = await Sponsor.findByIdAndUpdate(
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
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: "Sponsor deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;