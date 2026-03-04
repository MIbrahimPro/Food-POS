import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Blog.css';





const Blog = () => {
    const { slug } = useParams(); // Get the slug from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/blog/${slug}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error.response || error.message);
            }
            setLoading(false);
        };

        fetchBlog();
    }, [slug]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options); // Returns a formatted date like "December 7, 2024"
    };

    if (loading) return <div className='blog-page'>Loading...</div>;

    if (!blog) return <div className='blog-page'>Blog not found.</div>;

    return (
        <div className="blog-page">
            <h1 className='blog-title'>{blog.title}</h1>
            <div className='blog-info'>
                <img className='blog-author-image' src={`http://localhost:5000${blog.updatedBy.image}`} alt={blog.updatedBy.name} loading='lazy' />
                <h4 className='blog-author'>Updated by: {blog.updatedBy.name}</h4>
                <div className='blog-info-divider'></div>
                <h4 className='blog-date'>Updated on: {formatDate(blog.updatedAt)}</h4>

            </div>
            <div className='blog-details'>
                <img className='blog-image' src={`http://localhost:5000${blog.image}`} alt={blog.title} />
                {blog.intro && <p>{blog.intro}</p>}
                {blog.content.map((section, index) => (
                    <div key={index}>
                        <h3>{section.subheading}</h3>
                        <p>{section.paragraph}</p>
                    </div>
                ))}
                {blog.conclusion && <p>{blog.conclusion}</p>}
            </div>

            <div className='blog-orderbtn' onClick={() => navigate('/blog')}>
                MORE BLOGS
            </div>

        </div>
    );
};

export default Blog;
