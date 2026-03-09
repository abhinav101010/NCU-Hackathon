// const mongoose = require("mongoose");

// const EventSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     img: { type: String, required: true },
//     desc: { type: String, required: true },
//     date: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Event", EventSchema);

const mongoose = require("mongoose");

const ScheduleItem = new mongoose.Schema({
  time: String,
  title: String,
  description: String,
});

const DaySchema = new mongoose.Schema({
  day: String,
  title: String,
  schedule: [ScheduleItem],
});

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: String, required: true },

    days: [DaySchema], // structured schedule
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);