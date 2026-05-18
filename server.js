const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const errorHandler = require("./middleware/errorMiddleware");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB (single connection module — DRY principle)
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // Parse incoming JSON request bodies

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Global Kitchen API 🍽️" });
});

app.use("/recipes", recipeRoutes);

// 404 handler — catches any route not matched above
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// ── Global Error Handler ──────────────────────────────────────────────────────
// Must be registered LAST, after all routes
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
