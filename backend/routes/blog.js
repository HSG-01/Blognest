const express = require("express");

const router = express.Router();

const blogs = [];



// ==========================
// GET ALL BLOGS
// ==========================
router.get("/", (req, res) => {
    res.json({
        message: "Blogs fetched successfully",
        blogs: blogs
    });
});

// ==========================
// CREATE BLOG
// ==========================
router.post("/create", (req, res) => {

    const { title, content, author, category } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({
            message: "Title, content and author are required"
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        author,
        category: category || "General",
        status: "Published",
        date: new Date().toLocaleDateString("en-IN"),
        views: 0
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog created successfully",
        blog: newBlog
    });
});

module.exports = router;