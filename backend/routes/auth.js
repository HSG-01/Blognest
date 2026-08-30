const express = require("express");

const router = express.Router();

// User Registration API
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    res.status(201).json({
        message: "User registered successfully",
        user: {
            name,
            email
        }
    });
});

// Login API
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (email === "harish@example.com" && password === "Test12345") {
        return res.status(200).json({
            message: "Login successful",
            user: {
                email: email
            }
        });
    }

    return res.status(401).json({
        message: "Invalid email or password"
    });
});

module.exports = router;