import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../store/slices/auth/authSlice';

import './styles.css';

export const Navbar = () => {

    const { logged, email } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch( logout() );
        navigate('/login', {
            replace: true
        });
    }

    return (
        <nav className='navbar'>
            <Link to='/' className='navbar__brand-name'>
                Christmas Gift App
            </Link>

            <button className='navbar__hamburger' onClick={() => setIsNavExpanded(!isNavExpanded)}>
                <i className="fa-solid fa-bars"></i>
            </button>

            <div className={isNavExpanded ? 'navbar__navigation-menu expanded' : 'navbar__navigation-menu'}>
                {
                    logged && (
                        <ul>
                            <span>
                                { email }
                            </span>

                            <button
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}