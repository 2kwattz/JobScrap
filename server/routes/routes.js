const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware")

// User Model
const userModel = require('../models/user')

// Rate Limiting

const { generalApiLimiter, authApiLimiter } = require('../middleware/rateLimiterMiddleware')

router.use(generalApiLimiter);

// Index Route
router.get("/", async function (req, res) {
  res.send("Hello World")
})

router.get("/dashboard",authMiddleware, async function(req,res){
  console.log("Logged In")
  res.send("Logged In")
})

// POST REGISTER ROUTE
router.post("/register", authApiLimiter, async function (req, res) {
  try {
    const { firstName, lastName, emailAddress, password, confirmPassword, securityQuestionAnswer } = req.body;

    // Validating User Input
    if (!emailAddress || !firstName || !lastName || !password || !confirmPassword || !securityQuestionAnswer) {

      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      })
    }

    const normalizedEmail = emailAddress.toLowerCase();

    // Existing User Check
    const existingUser = await userModel.findOne({ emailAddress: normalizedEmail })
    if (existingUser) {
      return res.status(400).json({ success: false, message: "The user already exists" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    const newUser = new userModel({
      firstName,
      lastName,
      emailAddress,
      password,
      securityQuestionAnswer
    })

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        emailAddress: newUser.emailAddress
      }
    });
  }

  catch (error) {
    console.log("[Routes] Error in creating new user ", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// LOGIN ROUTE

router.post("/login", authApiLimiter, async function (req, res) {
  try {

    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const normalizedEmail = emailAddress.toLowerCase();

    const user = await userModel.findOne({ emailAddress: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // only works on HTTPS
      sameSite: "Strict"
    });

    res.status(200).json({
      success: true,
      message: "Login successful"
    });

  }
  catch (error) {
    console.log("Error in login ", error)
  }
})


router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});


module.exports = router;