// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  icon: { type: String, required: true }, // This will be the URL of the icon
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
