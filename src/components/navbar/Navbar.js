import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/slices/auth';
import { BrandName, NavBar, NavContent, NavInfo } from '../styles/navbar/Navbar.styled';
import { Button } from '../styles/shared/Button.styled';
import { Span } from '../styles/shared/Span.styled';

export const Navbar = () => {

    const { status, userName } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch( startLogout() );
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
                    status === 'authenticated' && (
                        <NavInfo>
                            <Span>
                                { userName }
                            </Span>

                            <Button
                                onClick={handleLogout}
                            >
                                <span>Logout</span>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Button>
                        </NavInfo>
                    )
                }
            </NavContent>
        </NavBar>
    )
}