import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGift, deleteActiveGift, editGift } from '../../store/slices/gifts';
import { closeModal } from '../../store/slices/modal';
import { defaultGifts } from '../../helpers/defaultGifts';

const initValues = {
    name: '',
    quantity: '',
    image: '',
    person: '',
    price: ''
}

export const GiftForm = () => {

    const { gifts, activeGift } = useSelector( state => state.gifts );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initValues);

    const { name, quantity, image, person, price } = formValues;

    useEffect(() => {
        activeGift ? setFormValues(activeGift) : setFormValues(initValues);
    }, [activeGift]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!activeGift){
            let newGift = {
                id: (+new Date()).toString(),
                name: name,
                quantity: quantity, 
                image: image,
                person: person, 
                price: price,
                total: quantity * price
            }
    
            const duplicate = gifts.some(gift => gift.name.toLowerCase() === newGift.name.toLowerCase());
    
            if(duplicate){
                console.log('Please do not repeat the gift. Show some more love');
            }else{
                dispatch( addGift( newGift ) );
            }
            
            setFormValues(initValues);
            dispatch( closeModal() );
        }else{
            const giftToEdit = {
                id: activeGift.id,
                name: name,
                quantity: quantity, 
                image: image,
                person: person, 
                price: price
            }
            
            dispatch( editGift( giftToEdit ) );
            dispatch( deleteActiveGift() );
            dispatch( closeModal() );
        }

    }

    const handleGetRandomGift = (e) => {
        e.preventDefault();

        const rand = Math.floor(Math.random() * defaultGifts.length);
        const randomGift = defaultGifts[rand];
        setFormValues({
            ...formValues, 
            name: randomGift.name,
            image: randomGift.image,
            quantity: randomGift.quantity,
            price: randomGift.price
        })
    }

    const isFormValid = () => {
        if(name.length === 0 && quantity.length === 0 && image.length === 0 && person.length === 0 && price.length === 0)
            return true;
        else
            return false;
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

            <button
                onClick={handleGetRandomGift}
            >
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
                max={999999}
                minLength={1}
                maxLength={7}
                required
                onChange={handleInputChange}
            />

            <button
                type='submit'
                disabled={isFormValid()}
            >
                Add a gift
            </button>

        </form>
    )
}