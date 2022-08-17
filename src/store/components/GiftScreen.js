import React from 'react';
import { useDispatch } from 'react-redux';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';

import { cleanList } from '../slices/gifts';

import './styles.css';

export const GiftScreen = () => {

    const dispatch = useDispatch();

    const handleCleanList = () => {
        dispatch( cleanList() );
    }

    return (
        <div className='gifts'>
            <GiftForm />
            <GiftsList />

            <button
                onClick={handleCleanList}
            >
                Delete All
            </button>
        </div>
    )
}