// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: { 
      type: Number,  
      required: true,
    },
    choices: [
      {
        label: {
          type: String,
        },
        options: [
          {
            name: {
              type: String,
            },
            price: {
              type: Number,  
            },
          },
        ],
      },
    ],
  });

module.exports = mongoose.model('Item', itemSchema);

