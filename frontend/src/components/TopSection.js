import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopSection.css';

const TopSection = ({ onCategorySelect, selectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="top-section">
            {loading && <div className="loading">Loading categories...</div>}
            {error && <div className="error">{error}</div>}

            {categories.length > 0 && !loading && !error && categories.map((category) => (
                <button 
                    key={category._id}
                    onClick={() => onCategorySelect(category._id)} 
                    className={`category-button ${selectedCategory === category._id ? 'active' : ''}`}
                >
                    <div className={`category-icon ${selectedCategory === category._id ? 'active' : ''}`}>
                        <img src={`http://localhost:5000${category.icon}`} alt={category.name} />
                    </div>
                    <p><b>{category.name}</b> ({category.count} Items)</p>
                </button>
            ))}
        </div>
    );
};

export default TopSection;
