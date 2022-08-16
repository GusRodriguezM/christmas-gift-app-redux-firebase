import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

export const GiftScreen = () => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <div className='gifts'>
            <h1>Gifts:</h1>
            {
                gifts.map(gift => (
                    <li key={gift.name}>
                        {gift.name}
                    </li>
                ))
            }
        </div>        
    )
}