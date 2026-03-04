const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    // detect route
    let folder = "uploads";

    if (req.baseUrl.includes("themes")) {
      folder = "uploads/themes";
    }

    if (req.baseUrl.includes("events")) {
      folder = "uploads/events";
    }

    if (req.baseUrl.includes("sponsors")) {
      folder = "uploads/sponsors";
    }

    // create folder if not exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      file.originalname.replace(/\s/g, "_");

    cb(null, uniqueName);
  },

});

const upload = multer({ storage });

module.exports = upload;