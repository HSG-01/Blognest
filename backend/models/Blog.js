const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    // User who created the blog
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    category: {
        type: String,
        default: "General"
    },

    status: {
        type: String,
        default: "Published"
    },

    date: {
        type: String,
        default: () => new Date().toLocaleDateString("en-IN")
    },

    views: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);