const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    teamId: { type: Number, unique: true },

    teamName: { type: String, required: true },
    teamLead: { type: String, required: true },
    phone: { type: String, required: true },
    university: { type: String, required: true },
    yearCourse: { type: String, required: true },

    member1: { type: String, required: true },
    member2: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    selectedTheme: { type: String, required: true },
    ideaDescription: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);