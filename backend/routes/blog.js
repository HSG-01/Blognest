const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();


// ==============================
// GET ALL BLOGS
// ==============================
router.get("/", async (req, res) => {
    try {

        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: blogs
        });

    } catch (error) {

        console.error("Fetch blogs error:", error.message);

        res.status(500).json({
            message: "Server error while fetching blogs"
        });

    }
});


// ==============================
// CREATE BLOG
// ==============================
router.post("/create", async (req, res) => {
    try {

        const {
            title,
            content,
            author,
            category
        } = req.body;

        // Check required fields
        if (!title || !content || !author) {
            return res.status(400).json({
                message: "Title, content and author are required"
            });
        }

        // Create new blog
        const newBlog = await Blog.create({
            title,
            content,
            author,
            category: category || "General",
            status: "Published",
            date: new Date().toLocaleDateString("en-IN"),
            views: 0
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {

        console.error("Create blog error:", error.message);

        res.status(500).json({
            message: "Server error while creating blog"
        });

    }
});


// ==============================
// GET SINGLE BLOG
// ==============================
router.get("/:id", async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        // Increase view count
        blog.views += 1;
        await blog.save();

        res.status(200).json({
            message: "Blog fetched successfully",
            blog: blog
        });

    } catch (error) {

        console.error("Fetch single blog error:", error.message);

        res.status(500).json({
            message: "Server error while fetching blog"
        });

    }
});


module.exports = router;