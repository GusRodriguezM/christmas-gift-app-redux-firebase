import React from 'react';
import { useSelector } from 'react-redux';
import { Gift } from './Gift';

export const GiftsList = () => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <div className=''>

            <h1>Gifts:</h1>
            {
                gifts.map(gift => (
                    <Gift key={gift.id} {...gift} />
                ))
            }
        
        </div>
    )
}