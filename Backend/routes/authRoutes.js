


const express = require("express");

const {
  registerUser,
  loginUser,
  getUserProfile,

  updateProfile,
  updateProfilePhoto,

} = require("../controllers/authController");

const { protect } =
  require("../middlewares/authMiddleware");

const upload =
  require("../middlewares/uploadMiddleware");

const router = express.Router();

// AUTH ROUTES
router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/profile",
  protect,
  getUserProfile
);

// UPDATE PROFILE
router.put(
  "/update-profile",
  protect,
  updateProfile
);

// UPDATE PROFILE PHOTO
router.put(
  "/update-profile-photo",
  protect,
  upload.single("profileImage"),
  updateProfilePhoto
);

// IMAGE UPLOAD
router.post(
  "/upload-image",
  upload.single("image"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const imageUrl =
      `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({
      imageUrl,
    });
  }
);

module.exports = router;