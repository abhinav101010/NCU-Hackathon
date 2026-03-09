const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
    },

    teamName: {
      type: String,
      required: true,
    },

    teamLead: {
      type: String,
      required: true,
    },

    teamLeadEmail: {
      type: String,
      required: true,
    },

    teamLeadTshirt: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    university: {
      type: String,
      required: true,
    },

    yearCourse: {
      type: String,
      required: true,
    },

    member1: {
      type: String,
      required: true,
    },
    member1Email: {
      type: String,
      required: true,
    },

    member1Phone: {
      type: String,
      required: true,
    },

    member1Tshirt: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },

    member2: {
      type: String,
      required: true,
    },

    member2Email: {
      type: String,
      required: true,
    },

    member2Phone: {
      type: String,
      required: true,
    },

    member2Tshirt: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },

    selectedTheme: {
      type: String,
      required: true,
    },

    ideaDescription: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Registration", registrationSchema);
