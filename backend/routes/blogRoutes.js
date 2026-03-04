// blogRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');  

const router = express.Router();


// Get a blog by slug
router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug: slug });

    if (blog) {
        res.json(blog);
    } else {
        res.status(404).send('Blog not found');
    }
});

// Fetch blogs with search term filtering
router.get('/', async (req, res) => {
  const { search } = req.query;
  let filter = {};

  // Filter by search term if provided
  if (search) {
    filter.title = new RegExp(search, 'i'); // case-insensitive search
  }

  try {
    const blogs = await Blog.find(filter);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
