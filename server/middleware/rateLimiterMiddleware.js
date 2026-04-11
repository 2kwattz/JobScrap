const rateLimit = require("express-rate-limit"); // API Rate Limiter

// 100 requests in 15min General API Limiter
const generalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
});

const authApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {
        success: false,
        message: "Too many login attempts, try again later."
    }
})

module.exports = {
  generalApiLimiter,
  authApiLimiter
};