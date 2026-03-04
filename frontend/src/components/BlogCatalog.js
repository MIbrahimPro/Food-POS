import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogCatalog.css';
import { useNavigate } from 'react-router-dom';

const BlogCatalog = ({ searchTerm }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchTerm) {
          params.search = searchTerm;
        }

        const response = await axios.get('/api/blog', { params });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error.response || error.message);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [searchTerm]);

  if (loading) return <div className="blog-catalog">Loading...</div>;

  return (
    <>
    <h3 className='read-blogs'>Read Our Blogs</h3>
    <div className="blog-catalog">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="blog-card"
            onClick={() => navigate(`/blog/${blog.slug}`)}
          >
            <div className="blog-img">
              <img src={`http://localhost:5000${blog.image}`} alt={blog.title} />
            </div>
            <h3>{blog.title}</h3>
          </div>
        ))
      ) : (
        <p>No blogs found for your search.</p>
      )}
    </div>
    </>
  );
};

export default BlogCatalog;





// import React from 'react';
// import './BlogCatalog.css';
// import { useNavigate} from 'react-router-dom';

// const BlogCatalog = ({searchTerm}) => {

//     const navigate = useNavigate();

//     return(
//         <>
//             <h1>List of all blogs</h1>
//             <br />
//             <br />
//             <a onClick={() => navigate('/blog/cheezious-the-awami-brand-thats-all-about-local-love')}> blog1 </a>
//             <br />
//             <br />
//             <a onClick={() => navigate('/blog/how-to-host-the-ultimate-pizza-party-with-cheezious')}> blog2 </a>
//             <br />
//             <br />
//             <a onClick={() => navigate('/blog/cheezious-and-chill-the-perfect-movie-night-pairings')}> blog3 </a>
//             <br />
//             <br />
//             <a onClick={() => navigate('/blog/the-art-of-pairing-cheezious-pizza-with-the-perfect-drinks')}> blog4 </a>
//             <br />
//             <br />
//             <a onClick={() => navigate('/blog/top-5-cheezious-hacks-for-maximum-flavor')}> blog5 </a>
//             <br />
//             <br />
//         </>
//     )
// };

// export default BlogCatalog;
