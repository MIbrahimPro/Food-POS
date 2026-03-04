// cartRoutes.js

const express = require('express');
const Cart = require('../models/CartItem');  

const router = express.Router();




// Create a new cart
router.post('/create', async (req, res) => {
  const { customerName, orderType, items } = req.body;

  console.log('Received order:', req.body); 

  if (!customerName || !items || !orderType || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid data:', { customerName, orderType, items }); 
      return res.status(400).json({ message: 'Invalid data (1 of them is missing or wrong)' });
  }

  try {
      const cart = await Cart.create({ customerName, orderType, items });
      console.log('Cart created successfully:', cart); 
      res.status(201).json(cart);
  } catch (error) {
      console.error('Error creating cart:', error);
      res.status(500).json({ message: 'Error creating cart', error: error.message });
  }

});



// Get all carts
router.get('/', async (req, res) => {
  try {
    // const carts = await Cart.find().populate('items.itemId');
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carts', error });
  }
});



router.get('/nextOrderNumber', async (req, res) => {
  try {
    const lastCart = await Cart.findOne().sort({ orderNumber: -1 });
    const nextOrderNumber = lastCart ? lastCart.orderNumber + 1 : 1;  // Default to 1 if no carts exist
    res.status(200).json({ nextOrderNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching next order number', error });
  }
});




// Get cart by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const cart = await Cart.findOne({ orderNumber: req.params.orderNumber }).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

module.exports = router;
