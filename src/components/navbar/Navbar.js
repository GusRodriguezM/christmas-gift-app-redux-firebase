import React, { useState } from 'react';
import './styles.css';

export const Navbar = () => {

    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const name = 'Your name';
    const logged = true;

    const handleLogout = () => {
        console.log('hello');
    }

    return (
        <nav className='navbar'>
            <a href='/' className='navbar__brand-name'>
                Christmas Gift App
            </a>

            <button className='navbar__hamburger' onClick={() => setIsNavExpanded(!isNavExpanded)}>
                <i className="fa-solid fa-bars"></i>
            </button>

            <div className={isNavExpanded ? 'navbar__navigation-menu expanded' : 'navbar__navigation-menu'}>
                {
                    logged && (
                        <ul>
                            <li>
                                { name }
                            </li>

                            <li
                                onClick={handleLogout}
                            >
                                <a href='/'>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}