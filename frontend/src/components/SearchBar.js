import React, { useState } from 'react';
import './SearchBar.css';
import { useLocation } from 'react-router-dom';



const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value); 
    };

    const handleIconClick = () => {
        onSearch(inputValue); 
    };

    const placeholder = location.pathname === '/blog' ? 'Search the one article you wanted to read...': 'Search something sweet on your mind...';


    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder={placeholder}
                value={inputValue} 
                onChange={handleInputChange} 
            />
            <button className='search-icon' onClick={handleIconClick}>
                <img src='/search.svg' alt='search' />
            </button>
        </div>
    );
};

export default SearchBar;
