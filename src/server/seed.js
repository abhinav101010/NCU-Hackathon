require("dotenv").config();
const mongoose = require("mongoose");

const Theme = require("./models/Theme");
const Event = require("./models/Event");
const Sponsor = require("./models/Sponsor");
const Rule = require("./models/Rule");

const events = [
  {
    title: "Opening Ceremony",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    desc: "Kickoff event with introduction, rules briefing, and team networking.",
    date: "Day 1 - 9:00 AM",
  },
  {
    title: "Mentorship Session",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    desc: "Experts help teams with technical guidance and project direction.",
    date: "Day 1 - 2:00 PM",
  },
  {
    title: "Workshop",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    desc: "Hands-on workshop on AI, Cloud, and modern technologies.",
    date: "Day 2 - 11:00 AM",
  },
  {
    title: "Final Presentation",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    desc: "Teams present their projects to judges and audience.",
    date: "Day 3 - 1:00 PM",
  },
  {
    title: "Prize Distribution",
    img: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8",
    desc: "Winners announced and prizes awarded.",
    date: "Day 3 - 5:00 PM",
  },
];

const rules = [
  { text: "1-4 members per team" },
  { text: "No plagiarism" },
  { text: "Submit before deadline" },
  { text: "Judges decision final" },
  { text: "Respect everyone" },
];

const sponsors = [
  {
    name: "Google",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Meta",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "OpenAI",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  },
  {
    name: "NVIDIA",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  },
];

const themes = [
  {
    title: "Education",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    desc: "Smart learning platforms and EdTech",
  },
  {
    title: "Artificial Intelligence",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    desc: "Machine learning and automation",
  },
  {
    title: "Healthcare",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
    desc: "Medical and health innovation",
  },
  {
    title: "Fintech",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    desc: "Finance and blockchain",
  },
  {
    title: "Agriculture",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
    desc: "Smart farming",
  },
  {
    title: "Open Innovation",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    desc: "Anything innovative",
  },
];


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");

    // Clear old data (optional but recommended)
    await Theme.deleteMany();
    await Event.deleteMany();
    await Sponsor.deleteMany();
    await Rule.deleteMany();

    // Insert new data
    await Theme.insertMany(themes);
    await Event.insertMany(events);
    await Sponsor.insertMany(sponsors);
    await Rule.insertMany(rules);

    console.log("Database Seeded Successfully 🚀");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });