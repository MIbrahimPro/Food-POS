import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const options = [
    { value: "option1", title: "Option 1", image: '/take-away.png' },
    { value: "option2", title: "Option 2", image: '/dine-in.png' }
];

const Cart = ({ cart, namechange, typechange, addItem , PlaceOrder, RemoveItem}) => {

    const [orderNumber, setOrderNumber] = useState(1);
    useEffect(() => {
        const fetchOrderNumber = async () => {
            const response = await axios.get('/api/cart/nextOrderNumber');
            setOrderNumber(response.data.nextOrderNumber);
        };
        fetchOrderNumber();
    }, [PlaceOrder]);

    const [name, setName] = useState(cart.customerName);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {namechange(name)},[name]);

    const [type, setType] = useState(cart.orderType);
    useEffect(() => {typechange(type)},[type]);
    

    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const fetchedItems = await Promise.all(
                    cart.items.map(async (item) => {
                        const response = await axios.get(`/api/items/${item.itemId}`);
                        return { ...response.data, quantity: item.quantity };
                    })
                );
                setItemsData(fetchedItems);
            } catch (error) {
                console.error('Error fetching cart item details:', error);
            }
        };
        console.log("it ran");
        fetchItemsData();
    }, [cart]);
    
    const calculateTotal = () => {
        return itemsData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };


    return (
        <div className="cart">
            <div className="cart-header">
                <div className="cart-loc" onClick={() => setType(type === 'Dine-In' ? 'Take-Out' : 'Dine-In')}>
                    <img src={options[type === 'Dine-In' ? 1 : 0].image} alt={options[type === 'Dine-In' ? 1 : 0].title} />
                </div>
                <div className="cart-det">
                    {isEditing ? (
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setIsEditing(false)} autoFocus className="editable-name-input" />
                    ) : (
                        <h3 onClick={() => setIsEditing(true)}>{name}'s Order</h3>
                    )}
                    <p>Order Number: #{String(orderNumber).padStart(3, '0')}</p>
                </div>
                <div className='cart-edit' onClick={() => setIsEditing(!isEditing)}>
                    <img src='/edit.png' alt='edit' />
                </div>
            </div>

            <div className="cart-items">
                
                
                {itemsData.length > 0 ? (
                    itemsData.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={`http://localhost:5000${item.image}`} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>Quantity: <b>{item.quantity}</b></p>
                                <p>Total: PKR {item.price * item.quantity}</p>
                            </div>
                            <button onClick={() => RemoveItem(item._id)} className="remove-item-button"><img src='/delete.svg' alt='remove' ></img></button>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <button className="place-order-button" onClick={() => { PlaceOrder();}}>Place Order: PKR {calculateTotal()}</button>
        </div>
    );
};

export default Cart;
