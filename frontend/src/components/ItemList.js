import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.css';

const ItemList = ({ addItemToCart, selectedCategory, searchTerm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const openPopup = (item) => {
        setSelectedItem(item);
        setTotalPrice(item.price);
        // setSelectedOptions({});
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

    // const handleOptionChange = (choiceLabel, option) => {
    //     const newOptions = { ...selectedOptions, [choiceLabel]: option };
    //     setSelectedOptions(newOptions);
    //     updateprice();
    // };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        setQuantity(newQuantity);
        setTotalPrice(selectedItem.price * newQuantity);
        // updateprice();
    };

    // const updateprice = () => {
    //     const choicesPrice = Object.values(selectedOptions).reduce((acc, choice) => acc + choice.price, 0);
    //     setTotalPrice((selectedItem.price + choicesPrice) * quantity);
    // }

    const handleAddToCart = () => {
        addItemToCart(selectedItem._id, quantity);
        closePopup();
    };

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const params = {};
                if (selectedCategory) {
                    params.category = selectedCategory;
                }
                if (searchTerm) {
                    params.search = searchTerm;
                }

                const response = await axios.get('/api/items', { params });
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error.response || error.message);
            }
            setLoading(false);
        };

        fetchItems();
    }, [selectedCategory, searchTerm]);

    if (loading) return <div className='item-list'>Loading...</div>;

    const sortedItems = [...items].sort((a, b) => a.quantity === 0 ? 1 : b.quantity === 0 ? -1 : 0);

    return (
        <div className="item-list">
            {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                    item && item.name ? (
                        <div
                            key={item._id}
                            className={`item-card ${item.quantity === 0 ? 'out-of-stock' : ''}`}
                            onClick={() => openPopup(item)}
                        >
                            <div className='item-img'> <img src={`http://localhost:5000${item.image}`} alt={item.name} /></div>
                            <h3>{item.name}</h3>
                            <div className='item-data'>
                                <p className='item-cat'><small>{item.category ? item.category.name : 'Uncategorized'}</small></p>
                                <p className="item-price">pkr.{item.price}</p>
                            </div>
                        </div>
                    ) : null
                ))

            ) : (
                <p>No items found for your search.</p>
            )}




            {isOpen && (
                <div className="popup-overlay" onClick={handleClickOutside}>
                    <div className="popup">
                        <button className="close-btn" onClick={closePopup}>&times;</button>
                        <img src={`http://localhost:5000${selectedItem.image}`} alt={selectedItem.name} className="popup-image" />
                        <h2>{selectedItem.name}</h2>
                        <p className="price">Price: PKR {totalPrice}</p>

                        <div className="options">
                            <div className="option-row quantity-row">
                                <label>Quantity:</label>
                                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="quantity-input" />
                            </div>
                            {/*
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
                                */}
                        </div>

                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add to Cart - PKR {totalPrice}
                        </button>
                    </div>
                </div>
            )}



        </div>
    );
};

export default ItemList;
