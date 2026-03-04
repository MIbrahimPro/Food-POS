// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate, useLocation  } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const setpage = (destiny) => {
        navigate(destiny);
        toggleSidebar();
    };

    const closeSidebar = (e) => {
        if (e.target.classList.contains('overlay')) {
            setIsOpen(false);
        }
    };

    const [currentDateTime, setCurrentDateTime] = useState({
        date: '',
        time: '',
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const formattedDate = now.toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });

            const formattedTime = now.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });

            setCurrentDateTime({ date: formattedDate, time: formattedTime });
        };

        updateDateTime(); 
        const interval = setInterval(updateDateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="navbar">




                <div className='nav-item' onClick={toggleSidebar}>
                    <img src='/menu-btn.svg' alt='menu-btn' />
                </div>
                <div className='nav-item'>
                    <img src='/logo.png' alt='menu-btn' />
                    <h3>Restaurant-Managment&nbsp;</h3>
                </div>
                <div className='nav-item'>
                    <img src='/calendar.svg' alt='calender' /><p><b>{currentDateTime.date}</b>&nbsp;</p>
                </div>
                <div className='nav-item'>
                    <img src='/clock.svg' alt='clock' /><p><b>{currentDateTime.time}</b>&nbsp;</p>
                </div>





                {/* Sidebar */}
                
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>

                    <div className='sb-top'>
                        <div className='sb-close' onClick={toggleSidebar}>
                            <img src='/close.svg' alt='close' />
                        </div>
                        <div className='sb-accinfo'>

                            <img src='/temp/avatar.jpeg' alt='avatar' />
                            <p><b>John Jelly&nbsp;</b><br /><span className='sb-role'>Cashier&nbsp;&nbsp;</span></p>

                        </div>

                    </div>
                    <div className='sb-data'>
                        <div className={`${location.pathname === '/pos' ? 'sb-data-active' : ''}`} onClick={() => setpage('/pos')}>
                            <div><img src='/pos.svg' alt='pos' /></div>
                            <p>Point of Sales</p>
                        </div>
                        <div  className={`${location.pathname === '/blog' ? 'sb-data-active' : ''}`} onClick={() => setpage('/blog')}>
                            <div><img src='/report.svg' alt='report' /></div>
                            {/* <p>Report</p> */}
                            <p>Blog</p>
                        </div>
                        <div  className={`${location.pathname === '/' ? 'sb-data-active' : ''}`} onClick={() => setpage('/')}>
                            <div><img src='/que.svg' alt='que' /></div>
                            <p>Que</p>
                        </div>
                        <div  className={`${location.pathname === '/' ? 'sb-data-active' : ''}`} onClick={() => setpage('/')}>
                            <div><img src='/history.svg' alt='history' /></div>
                            <p>History</p>
                        </div>
                        <div  className={`${location.pathname === '/' ? 'sb-data-active' : ''}`} onClick={() => setpage('/')}>
                            <div><img src='/inven.svg' alt='inven' /></div>
                            <p>Inventory</p>
                        </div>
                        <div  className={`${location.pathname === '/' ? 'sb-data-active' : ''}`} onClick={() => setpage('/')}>
                            <div><img src='/manage.svg' alt='manage' /></div>
                            <p>Admin Manage</p>
                        </div>
                    </div>
                    <div className='sb-bottom'>
                        <div className='sb-bottom-item'>
                            <p>Log Out</p>
                            <div><img src='/logout.svg' alt='logout' /></div>
                        </div>
                    </div>

                </div>
               
            {/* Overlay */}
            {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
           



            </nav>



        </>
    );
}

export default Navbar;
