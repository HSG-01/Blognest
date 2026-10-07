const mongoose = require("mongoose");

const viewedBlogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        blogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },

        viewedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate entries for the same user and blog
viewedBlogSchema.index(
    {
        userId: 1,
        blogId: 1
    },
    {
        unique: true
    }
);

module.exports =
    mongoose.model("ViewedBlog", viewedBlogSchema);