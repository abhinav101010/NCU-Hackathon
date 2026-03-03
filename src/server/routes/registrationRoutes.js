const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

//
// 🔹 GET ALL (Admin)
//
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🔹 GET SINGLE
//
router.get("/:id", async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    res.json(reg);
  } catch {
    res.status(404).json({ error: "Registration not found" });
  }
});

//
// 🔹 CREATE (Register Team)
//
router.post("/", async (req, res) => {
  try {
    const lastTeam = await Registration.findOne().sort({ teamId: -1 });

    const newTeamId = lastTeam ? lastTeam.teamId + 1 : 1;

    const newRegistration = new Registration({
      ...req.body,
      teamId: newTeamId,
    });

    await newRegistration.save();

    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// 🔹 UPDATE TEAM
//
router.put("/:id", async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// 🔹 DELETE TEAM
//
router.delete("/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// 🔹 LOGIN TEAM
//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const team = await Registration.findOne({ email });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (team.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      teamId: team.teamId,
      id: team._id,
      teamName: team.teamName,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;