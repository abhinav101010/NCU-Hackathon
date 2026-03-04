const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
{
  teamId: {
    type: String,
    required: true,
    unique: true
  },

  teamName: {
    type: String,
    required: true
  },

  teamLead: {
    type: String,
    required: true
  },

  teamLeadEmail: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  university: {
    type: String,
    required: true
  },

  yearCourse: {
    type: String,
    required: true
  },

  member1: String,
  member2: String,

  selectedTheme: {
    type: String,
    required: true
  },

  ideaDescription: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);