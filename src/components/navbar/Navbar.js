import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/auth/authSlice';

import { BrandName, NavBar, NavContent, NavInfo } from '../styles/navbar/Navbar.styled';
import { Button } from '../styles/shared/Button.styled';
import { Span } from '../styles/shared/Span.styled';

export const Navbar = () => {

    const { logged, email } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        dispatch( logout() );
        navigate('/auth/login', {
            replace: true
        });
    }

    return (
        <NavBar>
            <BrandName to='/' >
                Christmas Gift App
            </BrandName>

            {/* <button className='navbar__hamburger' onClick={() => setIsNavExpanded(!isNavExpanded)}>
                <i className="fa-solid fa-bars"></i>
            </button> */}

            <NavContent>
                {
                    logged && (
                        <NavInfo>
                            <Span>
                                { email }
                            </Span>

                            <Button
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </NavInfo>
                    )
                }
            </NavContent>
        </NavBar>
    )
}