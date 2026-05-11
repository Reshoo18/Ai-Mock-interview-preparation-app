

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Otp =
  require("../models/Otp");

const sendOtpEmail =
  require("../utils/sendOtpEmail");


// GENERATE TOKEN
const generateToken = (userId) => {

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// REGISTER USER
const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      profileImageUrl,
    } = req.body;

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl:
          profileImageUrl || "",
      });

    res.status(201).json({

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl:
          user.profileImageUrl,
      },

      token:
        generateToken(user._id),
    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// LOGIN USER
const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {

      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    res.json({

      _id: user._id,

      name: user.name,

      email: user.email,

      profileImageUrl:
        user.profileImageUrl,

      token:
        generateToken(user._id),
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// GET USER PROFILE
const getUserProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {

      return res.status(404).json({
        message:
          "User not found",
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// UPDATE PROFILE
const updateProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {

      return res.status(404).json({
        message:
          "User not found",
      });
    }

    if (req.body.name) {

      user.name =
        req.body.name;
    }

    if (req.body.email) {

      user.email =
        req.body.email;
    }

    await user.save();

    res.status(200).json({

      success: true,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl:
          user.profileImageUrl,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// UPDATE PROFILE PHOTO
const updateProfilePhoto =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (!req.file) {

        return res.status(400).json({
          message:
            "No image uploaded",
        });
      }

      const imageUrl =
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      user.profileImageUrl =
        imageUrl;

      await user.save();

      res.status(200).json({

        success: true,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImageUrl:
            user.profileImageUrl,
        },
      });

    } catch (error) {

      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

  const sendOtp = async (
  req,
  res
) => {
  
  
   console.log("SEND OTP API HIT");
    console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
  try {

    const { email } =
      req.body;

    const otp =
      Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

    await Otp.deleteMany({
      email,
    });

    await Otp.create({

      email,

      otp,

      expiresAt:
        Date.now() +
        5 * 60 * 1000,
    });

    await sendOtpEmail(
      email,
      otp
    );

    res.json({
      success: true,
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};


const verifyOtp = async (
  req,
  res
) => {

  try {

    const { email, otp } =
      req.body;

    const existingOtp =
      await Otp.findOne({
        email,
        otp,
      });

    if (!existingOtp) {

      return res.status(400).json({
        message:
          "Invalid OTP",
      });
    }

    if (
      existingOtp.expiresAt <
      Date.now()
    ) {

      return res.status(400).json({
        message:
          "OTP expired",
      });
    }

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};


module.exports = {

  registerUser,

  loginUser,

  getUserProfile,

  updateProfile,

  updateProfilePhoto,

  generateToken,
  sendOtp,
verifyOtp
};