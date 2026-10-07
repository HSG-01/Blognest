const express = require("express");
const cors = require("cors");
require("dotenv").config();

const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const connectDB = require("./db");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        message: "BlogNest Backend API is running!"
    });
});

// Start server locally
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(
            `BlogNest backend server running on http://localhost:${PORT}`
        );
    });
}

module.exports = app;