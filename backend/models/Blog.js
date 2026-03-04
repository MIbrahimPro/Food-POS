const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    intro: {
        type: String,
        required: true, // Intro paragraph is required
        trim: true,
    },
    content: [
        {
            subheading: {
                type: String,
                trim: true,
            },
            paragraph: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
    conclusion: {
        type: String, // Conclusion paragraph, not required
        trim: true,
    },
    image: {
        type: String, // URL of the image
        required: true,
    },
    updatedBy: {
        name: {
            type: String,
            required: true, // Name of the person who updated
            trim: true,
        },
        image: {
            type: String, // URL of their image
            required: true,
        },
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    },
});

module.exports = mongoose.model("Blog", blogSchema);
