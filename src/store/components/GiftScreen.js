import React from 'react';
import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';

import './styles.css';

export const GiftScreen = () => {
    return (
        <div className='gifts'>
            <GiftForm />
            <GiftsList />
        </div>
    )
}