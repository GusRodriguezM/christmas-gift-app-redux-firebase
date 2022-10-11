import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGift, deleteActiveGift, duplicateGift, editGift, setActiveGift, startAddingNewGift } from '../../store/slices/gifts';
import { closeModal } from '../../store/slices/modal';
import { defaultGifts } from '../../helpers/defaultGifts';
import { GiftButton } from '../styles/shared/Button.styled';
import Input from '../styles/elements/Input.styled';
import { Form } from '../styles/gifts/form/Form.styled';

const initValues = {
    name: '',
    quantity: '',
    imageURL: '',
    ToPerson: '',
    price: ''
}

export const GiftForm = () => {

    const { gifts, activeGift } = useSelector( state => state.gifts );
    const { option } = useSelector( state => state.modal );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initValues);

    const { name, quantity, imageURL, toPerson, price } = formValues;
    
    // console.log(formValues);

    // useEffect(() => {
    //     activeGift ? setFormValues(activeGift) : setFormValues(initValues);
    // }, [activeGift]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!activeGift){
            const newGift = {
                name: name,
                price: price,
                toPerson: toPerson,
                quantity: quantity,
                imageURL: imageURL,
                total: quantity * price
            }
    
            const duplicate = gifts.some(gift => gift.name.toLowerCase() === newGift.name.toLowerCase());
    
            if(duplicate){
                console.log('Please do not repeat the gift. Show some more love');
            }else{
                dispatch( startAddingNewGift(newGift) );
                setFormValues(initValues);
                dispatch( closeModal() );
            }
            
        }
        // }else{
        //     if(option === 'edit'){
        //         const giftToEdit = {
        //             id: activeGift.id,
        //             name: name,
        //             quantity: quantity, 
        //             image: image,
        //             person: person, 
        //             price: price,
        //             total: quantity * price
        //         }
                
        //         dispatch( editGift( giftToEdit ) );
        //         dispatch( deleteActiveGift() );
        //         dispatch( closeModal() );
        //     }else{
        //         const giftToDuplicate = {
        //             id: (+new Date()).toString(),
        //             name: name,
        //             quantity: quantity, 
        //             image: image,
        //             person: person, 
        //             price: price,
        //             total: quantity * price
        //         }


        //         dispatch( duplicateGift( activeGift.id, giftToDuplicate ) );
        //         dispatch( deleteActiveGift() );
        //         dispatch( closeModal() );
        //     }
        // }

    }

    const handleGetRandomGift = (e) => {
        e.preventDefault();

        const rand = Math.floor(Math.random() * defaultGifts.length);
        const randomGift = defaultGifts[rand];
        setFormValues({
            ...formValues, 
            name: randomGift.name,
            imageURL: randomGift.image,
            quantity: randomGift.quantity,
            price: randomGift.price
        })
    }

    // const isFormValid = () => {
    //     if(name.length === 0 && quantity.length === 0 && image.length === 0 && person.length === 0 && price.length === 0)
    //         return true;
    //     else
    //         return false;
    // }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type='text'
                placeholder='Your Gift'
                name='name'
                value={name}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <GiftButton
                onClick={handleGetRandomGift}
            >
                Surprise
            </GiftButton>

            <Input
                type='number'
                placeholder='Quantity'
                name='quantity'
                value={quantity}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <Input
                type='text'
                placeholder='Your image'
                name='imageURL'
                value={imageURL}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <Input
                type='text'
                placeholder='To:'
                name='toPerson'
                value={toPerson}
                autoComplete='off'
                required
                onChange={handleInputChange}
            />

            <Input
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

            <GiftButton
                type='submit'
                // disabled={isFormValid}
            >
                Add a gift
            </GiftButton>

        </Form>
    )
}