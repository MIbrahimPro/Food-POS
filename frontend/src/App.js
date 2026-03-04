import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import TopSection from './components/TopSection';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import BlogCatalog from './components/BlogCatalog';
import Blog from './components/Blog';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('672f5e2f50aef9c7392710c2');
    const [searchTerm, setSearchTerm] = useState('');

    const [cart, setCart] = useState({
        customerName: 'Guest',
        orderType: 'Dine-In',
        items: []
    });



    const changename = (name) => {
        setCart((prevCart) => ({
            ...prevCart,
            customerName: name
        }));
    }

    const changetype = (orderType) => {
        setCart((prevCart) => ({
            ...prevCart,
            orderType: orderType
        }));
    }



    const addItemToCart = (itemId, quantity) => {
        // Update your cart state logic here
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item.itemId === itemId);
            if (existingItem) {
                // Update quantity if item already exists
                return {
                    ...prevCart,
                    items: prevCart.items.map(item =>
                        item.itemId === itemId ? { ...item, quantity: item.quantity + quantity } : item
                    )
                };
            } else {
                // Add new item
                return {
                    ...prevCart,
                    items: [...prevCart.items, { itemId, quantity }]
                };
            }
        });
    };

    const removeItemFromCart = (itemId) => {
        // Update your cart state logic here
        setCart(prevCart => ({
            ...prevCart,
            items: prevCart.items.filter(item => item.itemId !== itemId)
        }));
    };

    const placeOrder = async () => {
        try {
            console.log(cart);
            await axios.post('/api/cart/create', cart);
            alert('Order placed successfully!');
            setCart({ customerName: 'Guest', orderType: 'Dine-In', items: [] });
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/pos" element={
                    <>
                        <div className='panel-container'>
                            <div className="left-panel">
                                <TopSection onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
                                <SearchBar onSearch={setSearchTerm} />
                                <ItemList addItemToCart={addItemToCart} selectedCategory={selectedCategory} searchTerm={searchTerm} />
                            </div>
                            <div className="right-panel">
                                <Cart
                                    cart={cart}
                                    namechange={changename}
                                    typechange={changetype}
                                    addItem={addItemToCart}
                                    PlaceOrder={placeOrder}
                                    RemoveItem={removeItemFromCart}
                                />
                            </div>
                        </div>
                    </>
                } />

                <Route path="/blog/:slug" element={
                    <>
                        <Blog /> 
                        <Footer />
                    </>
                } />
                

                <Route path="/blog" element={
                    <>
                        <SearchBar onSearch={setSearchTerm} />
                        <BlogCatalog  searchTerm={searchTerm} />
                        <Footer />
                    </>
                } />
            </Routes>
        </Router>
    );
};

export default App;
