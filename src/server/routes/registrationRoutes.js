const express = require("express");
const sendTeamCode = require("../utils/sendMail");
const router = express.Router();
const Registration = require("../models/Registration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { calculateTimeLeft } = require("../../utils/common");
// const teamCode = "TEAM-" + Math.random().toString(36).substring(2, 8).toUpperCase();

//
// 🔹 LOGIN TEAM (MUST COME FIRST)
//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const team = await Registration.findOne({ email });

    if (!team) return res.status(404).json({ error: "Team not found" });

    const isMatch = await bcrypt.compare(password, team.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: team._id, teamId: team.teamId, role: "team" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      teamName: team.teamName,
      teamId: team.teamId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🔹 GET CURRENT TEAM (MUST COME BEFORE /:id)
//
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const team = await Registration.findById(decoded.id).select("-password");

    if (!team) return res.status(404).json({ error: "Team not found" });

    res.json(team);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.put("/me", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updateData = { ...req.body };

    // if password is being changed, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updated = await Registration.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(401).json({ error: "Update failed" });
  }
});

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
// 🔹 CREATE
//
router.post("/", async (req, res) => {
  if (calculateTimeLeft().expired) {
    return res.status(403).json({
      error: "Registrations are closed",
    });
  }
  try {
    const {
      teamName,
      teamLead,
      teamLeadEmail,
      teamLeadTshirt,
      phone,
      email,
      password,
      university,
      yearCourse,
      member1,
      member1Tshirt,
      member2,
      member2Tshirt,
      selectedTheme,
      ideaDescription,
    } = req.body;

    if (!teamName || !teamLead || !teamLeadEmail || !email || !password) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate unique team code
    let teamCode;
    let exists = true;

    while (exists) {
      teamCode =
        "TEAM-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      const existing = await Registration.findOne({ teamId: teamCode });
      if (!existing) exists = false;
    }

    const registration = new Registration({
      teamId: teamCode,
      teamName,
      teamLead,
      teamLeadEmail,
      teamLeadTshirt,
      phone,
      email,
      password: hashedPassword,
      university,
      yearCourse,
      member1,
      member1Tshirt,
      member2,
      member2Tshirt,
      selectedTheme,
      ideaDescription,
    });

    if (
      !teamName ||
      !teamLead ||
      !teamLeadEmail ||
      !email ||
      !password ||
      !teamLeadTshirt ||
      !member1Tshirt ||
      !member2Tshirt
    ) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    await registration.save();

    // send email
    try {
      await sendTeamCode(teamLeadEmail, teamCode);
      console.log("Email sent successfully");
    } catch (err) {
      console.log("Email failed", err);
    }

    res.status(201).json({
      message: "Registration successful",
      teamId: teamCode,
      data: registration,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

//
// 🔹 UPDATE BY ID
//
router.put("/:id", async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// 🔹 DELETE
//
router.delete("/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
