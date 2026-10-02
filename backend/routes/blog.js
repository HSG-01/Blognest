const express = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==============================
// GET ALL BLOGS
// ==============================
router.get("/", authMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: blogs
        });

    } catch (error) {

        console.error(
            "Fetch blogs error:",
            error.message
        );

        res.status(500).json({
            message: "Server error while fetching blogs"
        });
    }
});


// ==============================
// CREATE BLOG
// ==============================
router.post("/create", authMiddleware, async (req, res) => {
    try {

        const {
            title,
            content,
            category
        } = req.body;

        // Find the logged-in user
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Check required fields
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        // Create new blog
        const newBlog = await Blog.create({
            title,
            content,
            author: user.name,
            userId: user._id,
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


// ==============================
// UPDATE BLOG
// ==============================
router.put("/:id", authMiddleware, async (req, res) => {
    try {

        const {
            title,
            content,
            category
        } = req.body;

        // Check required fields
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        // Find and update only the logged-in user's blog
        const updatedBlog = await Blog.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            {
                title,
                content,
                category: category || "General"
            },
            {
                new: true,
                runValidators: true
            }
        );

        // Blog not found or does not belong to user
        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found or you do not have permission to update it"
            });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {

        console.error("Update blog error:", error.message);

        res.status(500).json({
            message: "Server error while updating blog"
        });

    }
});

// ==============================
// DELETE BLOG
// ==============================
router.delete("/:id", authMiddleware, async (req, res) => {
    try {

        // Find and delete only the logged-in user's blog
        const deletedBlog = await Blog.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        // Blog not found or does not belong to user
        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully",
            blog: deletedBlog
        });

    } catch (error) {

        console.error("Delete blog error:", error.message);

        res.status(500).json({
            message: "Server error while deleting blog"
        });

    }
});


module.exports = router;