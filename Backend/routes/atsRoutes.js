const express = require("express");

const multer = require("multer");

const {
  checkATSScore,
} = require("../controllers/atsController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/check-ats",
  upload.single("resume"),
  checkATSScore
);

module.exports = router;