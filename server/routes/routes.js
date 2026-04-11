const express = require('express');
const router = express.Router();

// User Model
const userModel = require('../models/user')

// Rate Limiting

const { generalApiLimiter, authApiLimiter } = require('../middleware/rateLimiterMiddleware')

router.use(generalApiLimiter);

router.get("/", async function (req, res) {
  res.send("Hello World")
})

router.post("/register", authApiLimiter, async function (req, res) {
  try {
    const { firstName, lastName, emailAddress, password, confirmPassword, securityQuestionAnswer } = req.body;

    // Validating User Input

    if(!emailAddress || !firstName || !lastName || !emailAddress || !password || !confirmPassword || !securityQuestionAnswer){

      return res.status(400).json({
        success: false,
        message:"Required fields missing"
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
})


router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


module.exports = router;