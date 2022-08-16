import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGift } from '../slices/gifts';

const initValues = {
    name: '',
    quantity: '',
    image: '',
    person: '',
    price: ''
}

export const GiftForm = () => {

    const [formValues, setFormValues] = useState(initValues);
    const dispatch = useDispatch();

    const { name, quantity, image, person, price } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formValues)
        dispatch( addGift( formValues ) );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Your Gift'
                name='name'
                value={name}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <button>
                Surprise
            </button>

            <input 
                type='number'
                placeholder='Quantity'
                name='quantity'
                value={quantity}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <input
                type='text'
                placeholder='Your image'
                name='image'
                value={image}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <input 
                type='text'
                placeholder='To:'
                name='person'
                value={person}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <input
                type='number'
                placeholder='Price'
                name='price'
                value={price}
                autoComplete='off'
                min={1}
                max={9999}
                minLength={1}
                maxLength={3}
                required
                onChange={handleInputChange}
            />

            <button
                type='submit'
            >
                Add a gift
            </button>

        </form>
    )
}