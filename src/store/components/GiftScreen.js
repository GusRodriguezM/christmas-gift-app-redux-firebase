import React from 'react';
import { useSelector } from 'react-redux';

export const GiftScreen = () => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <div>
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