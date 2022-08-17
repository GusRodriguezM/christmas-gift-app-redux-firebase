import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';
import { EmptyList } from './EmptyList';

import { cleanList } from '../slices/gifts';

import './styles.css';

export const GiftScreen = () => {

    const { gifts } = useSelector( state => state.gifts );
    const dispatch = useDispatch();

    const handleCleanList = () => {
        dispatch( cleanList() );
    }

    // console.log(gifts);

    return (
        <div className='gifts'>
            <GiftForm />

            
            {
                gifts.length === 0 
                    ? (<EmptyList />)
                    : (<GiftsList />)
            }            

            <button
                onClick={handleCleanList}
            >
                Delete All
            </button>
        </div>
    )
}