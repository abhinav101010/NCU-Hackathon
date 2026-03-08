const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },

    problemStatements: {
      text: { type: String, required: true },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", ThemeSchema);