const express = require('express'); //NodeJs Express Framework
const app = express(); // Express Instance
const http = require('http'); // REQUIRED for Socket.IO
const { Server } = require('socket.io');
const server = http.createServer(app);


require('dotenv').config();
const axios = require('axios')
const compression = require('compression')
const errorMiddleware = require('./middleware/errorMiddleware')
const path = require('path');
const helmet = require('helmet');
const connectDB = require('./db/conn')
const fs = require('fs'); // For managing files

// BCrypt Hashing Algorithm for Security
const bcrypt = require('bcryptjs');
// Multer for storing Profile Picture (User's DP)
const multer = require('multer');
const mongoSanitize = require('express-mongo-sanitize'); // Mongodb Input Sanitize

// Nodemailer for verification mail
const nodemailer = require('nodemailer');

// JWT Tokens for authentication and verifying users identity
const jwt = require('jsonwebtoken'); // Importing JWT Library

// Connect Database
connectDB()

const port = process.env.PORT || 80; // Server Port Number

// Cookie Parser for JWT Token Authentication
const cookieParser = require("cookie-parser"); // For JWT Verification

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// SQL Injection Middleware (Ik we dont have sql, just to confuse the enemy)
const sqlInjectionMiddleware = require("./middleware/sqlInjectionMiddleware")

// Middlewares

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(cookieParser()); // Initializing CookieParser Middleware
app.use(compression()) // Compression Middleware for speed optimization

// Body parsing
app.use(helmet()); //Security Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sqlInjectionMiddleware)

// Sanitizes Mongodb data input by removing malicious special symbols
// app.use(
//   mongoSanitize({
//     replaceWith: '_',
//     onSanitize: ({ req, key }) => {
//       console.warn("Sanitized:", key);
//     }
//   })
// );

//  Creating a new router

const router = require('./routes/routes');

// Mount all routes
app.use('/api', router);

// Socket Connection

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

app.use(errorMiddleware)

app.listen(port, function () {
    console.log(`The server has started. Listening on port ${port}`);
})

