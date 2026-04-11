const errorMiddleware = (err,req,res,next) =>{
     console.error(`[ERROR MIDDLEWARE] ${err.stack}`);
     const statusCode = er.StatusCode || 500;

     res.status(statusCode).json({
        success:false,
        message: er.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack

     })


}

module.exports = errorMiddleware;