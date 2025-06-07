const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const filingRoutes = require("./routes/filings");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/customs_filings",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes
app.use("/api/filings", filingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
