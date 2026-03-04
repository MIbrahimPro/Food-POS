// cartModel.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  orderNumber: { type: Number, unique: true }, 
  customerName: { type: String, required: true }, 
  orderType: { type: String, required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, 
      quantity: { type: Number, required: true } 
    }
  ]
});



async function getNextOrderNumber() {
  const lastCart = await Cart.findOne().sort({ orderNumber: -1 });
  return lastCart ? lastCart.orderNumber + 1 : 1;
}

cartSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    this.orderNumber = await getNextOrderNumber();
  }
  next();
});

// Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
