import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteGift } from '../slices/gifts';

export const Gift = ({ id, name, quantity, image, person, price }) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( deleteGift(id) );
    }

    return (
        <div>
            <img alt={name} src={image} style={{width: '100px', height: '100px'}}/>

            <div>
                <h3>{name}</h3>
                <h3>{person}</h3>
                <h3>({quantity}) - {quantity * price}</h3>
            </div>

            <button
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}