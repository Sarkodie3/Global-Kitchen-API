const errorHandler = (err, req, res, next) => {
  // Use the error's own statusCode, or default to 500
  let statusCode = err.statusCode || res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // Mongoose CastError — invalid MongoDB ObjectId format
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Recipe not found — invalid ID format";
  }

  // Mongoose ValidationError — schema constraints failed
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Collect all validation messages into one readable string
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `A recipe with that ${field} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Only expose stack trace in development for debugging
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
