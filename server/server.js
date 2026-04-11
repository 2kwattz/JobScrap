const express = require('express'); //NodeJs Express Framework
const app = express(); // Express Instance

const dotenv = require('dotenv').config();
const axios = require('axios')
const cheerio = require('cheerio');
const compression = require('compression')
const errorMiddleware = require('./middleware/errorMiddleware')
const path = require('path');
const helmet = require('helmet');
const connectDB = require('./db/conn')

const bodyParser = require('body-parser');  // For getting Web Form Data
const fs = require('fs'); // For managing files

// Multer for storing Profile Picture (User's DP)

const multer = require('multer');

// Connect Database
connectDB()

// Middlewares

// Compression Middleware for speed optimization

app.use(compression())

// BCrypt Hashing Algorithm for Security

const bcrypt = require('bcryptjs');

// JWT Tokens for authentication and verifying users identity
const jwt = require('jsonwebtoken'); // Importing JWT Library


// Cookie Parser for JWT Token Authentication

const cookieParser = require("cookie-parser"); // For JWT Verification
app.use(cookieParser()); // Initializing CookieParser Middleware

// Nodemailer for verification mail

const nodemailer = require('nodemailer');

const port = process.env.PORT || 80; // Server Port Number

app.use(bodyParser.urlencoded({ extended: false })); //Middlewares for parsing the request body
app.use(bodyParser.json());
app.use(helmet()); //Security Middleware

//  Creating a new router

const router = require('./routes/routes');

// Mount all routes
app.use('/api', router);
app.use(errorMiddleware)

app.listen(port, function () {
    console.log(`The server has started. Listening on port ${port}`);
})

