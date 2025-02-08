require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const indexRoutes = require("./routes/indexRoutes");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
