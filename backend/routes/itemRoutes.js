const express = require('express');
const mongoose = require('mongoose');
const Item = require('../models/Item');

const router = express.Router();

// Route to fetch items based on category or search term
router.get('/', async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    // Filter by category if provided (check if category is a valid ObjectId)
    if (category && category !== "672f5e2f50aef9c7392710c2") {
        if (mongoose.Types.ObjectId.isValid(category)) {
            filter.category = new mongoose.Types.ObjectId(category); // Use ObjectId for filtering
        }
    }

    // Filter by search term if provided
    if (search) {
        filter.name = new RegExp(search, 'i');  // case-insensitive search
    }

    try {
        const items = await Item.find(filter).populate('category', 'name');
        res.json(items); // Send the filtered items as response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch an item by ObjectId
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the provided ID to ensure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }

    try {
        // Fetch the item using the ObjectId
        const item = await Item.findById(id).populate('category', 'name');
        
        // If no item is found with the given ObjectId
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item); // Send the item details as response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
