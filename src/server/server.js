require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// console.log("EMAIL USER:", process.env.EMAIL_USER);
// console.log("EMAIL PASS:", process.env.EMAIL_PASS);

app.use(cors());
app.use(express.json());

// Routes
app.use("/uploads", express.static("uploads"));

app.use("/api/themes", require("./routes/themesRoutes"));
app.use("/api/events", require("./routes/eventsRoutes"));
app.use("/api/sponsors", require("./routes/sponsorsRoutes"));
app.use("/api/rules", require("./routes/rulesRoutes"));

app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Connect MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));