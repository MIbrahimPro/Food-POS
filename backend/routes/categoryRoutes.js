const express = require('express');
const Category = require('../models/Category');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();
    
    // Initialize categoryCounts with category ids and their names
    const categoryCounts = categories.map(category => ({
      _id: category._id,
      name: category.name,
      count: 0,
    }));

    // Fetch all items
    const items = await Item.find();
    
    for (const item of items) {
      // Increment the count for the "All Menu" category (index 0)
      categoryCounts[0].count++;

      // Ensure item.category is an ObjectId and matches the category _id
      if (item.category) {
        const categoryIndex = categoryCounts.findIndex(c => c._id.toString() === item.category.toString());
        if (categoryIndex !== -1) {
          categoryCounts[categoryIndex].count++;
        }
      }
    }

    // Update category counts in the database
    for (const categoryCount of categoryCounts) {
      await Category.findOneAndUpdate(
        { _id: categoryCount._id },
        { count: categoryCount.count },
        { new: true }
      );
    }

    // Fetch and send back the updated categories
    const updatedCategories = await Category.find();
    res.json(updatedCategories);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
