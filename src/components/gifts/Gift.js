import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteGift, setActiveGift } from '../../store/slices/gifts';
import { openModal } from '../../store/slices/modal';

export const Gift = ({ id, name, quantity, image, person, price }) => {

    const dispatch = useDispatch();

    const handleEditGift = () => {

        const giftToEdit = {
            id: id,
            name: name,
            quantity: quantity,
            image: image,
            person: person,
            price: price
        }

        dispatch( setActiveGift( giftToEdit ) );
        dispatch( openModal() );
    }

    const handleDeleteGift = () => {
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
                onClick={handleEditGift}
            >
                Edit
            </button>

            <button
                onClick={handleDeleteGift}
            >
                Delete
            </button>
        </div>
    )
}