import React, { useState } from 'react';
import './test.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const foodItems = [
    {
      _id: '672f9d51f43fdc29982710c8',
      name: 'Vegetarian Sandwich',
      image: '/public/images/vegetarian_sandwich.png',
      price: 550,
      choices: [
        {
          label: 'Size',
          options: [
            { name: 'Small', price: 350 },
            { name: 'Medium', price: 450 },
            { name: 'Large', price: 550 }
          ]
        }
      ]
    },
  ];

  const openPopup = (item) => {
    setSelectedItem(item);
    setTotalPrice(item.price);
    setSelectedOptions({});
    setQuantity(1);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  const handleOptionChange = (choiceLabel, option) => {
    const newOptions = { ...selectedOptions, [choiceLabel]: option };
    setSelectedOptions(newOptions);

    const choicesPrice = Object.values(newOptions).reduce((acc, choice) => acc + choice.price, 0);
    setTotalPrice(selectedItem.price * quantity + choicesPrice);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    const choicesPrice = Object.values(selectedOptions).reduce((acc, choice) => acc + choice.price, 0);
    setTotalPrice((selectedItem.price + choicesPrice) * newQuantity);
  };

  return (
    <div className="App">
      <div className="food-items">
        {foodItems.map((item) => (
          <div key={item._id} className="food-item" onClick={() => openPopup(item)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="popup-overlay" onClick={handleClickOutside}>
          <div className="popup">
            <button className="close-btn" onClick={closePopup}>X</button>
            <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
            <h2>{selectedItem.name}</h2>
            <p className="price">Price: PKR {totalPrice}</p>

            <div className="options">
              <div className="option-row quantity-row">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
              </div>

              {selectedItem.choices?.map((choice) => (
                <div key={choice.label} className="option-row">
                  <label>{choice.label}:</label>
                  <select
                    value={selectedOptions[choice.label]?.name || ''}
                    onChange={(e) =>
                      handleOptionChange(
                        choice.label,
                        choice.options.find((opt) => opt.name === e.target.value)
                      )
                    }
                  >
                    <option value="">Select {choice.label}</option>
                    {choice.options.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name} (PKR {option.price})
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button className="add-to-cart-btn">
              Add to Cart - PKR {totalPrice}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
