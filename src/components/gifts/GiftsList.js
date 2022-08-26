import React from 'react';
import { useSelector } from 'react-redux';
import { Gift } from './Gift';
import { List } from '../styles/gifts/list/List.styled';

export const GiftsList = () => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <List>

            <h1>Gifts:</h1>
            {
                gifts.map(gift => (
                    <Gift key={gift.id} {...gift} />
                ))
            }
        
        </List>
    )
}