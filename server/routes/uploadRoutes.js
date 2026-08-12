const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

// Upload API
router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    res.status(200).json({
      message: "Image Uploaded Successfully",
      image: `/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;