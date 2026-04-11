const errorMiddleware = (err,req,res,next) =>{
     console.error(`[ERROR MIDDLEWARE] ${err.stack}`);
     const statusCode = err.StatusCode || 500;

     res.status(statusCode).json({
        success:false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack

     })


}

module.exports = errorMiddleware;