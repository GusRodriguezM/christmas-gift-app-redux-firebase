import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActiveGift, startAddingNewGift, startDuplicatingGift, startSavingGift } from '../../store/slices/gifts';
import { closeModal } from '../../store/slices/modal';
import { defaultGifts } from '../../helpers/defaultGifts';
import { GiftButton } from '../styles/shared/Button.styled';
import Input from '../styles/elements/Input.styled';
import { Form } from '../styles/gifts/form/Form.styled';
import { useRef } from 'react';

const initValues = {
    name: '',
    quantity: '',
    imageURL: '',
    toPerson: '',
    price: ''
}

export const GiftForm = () => {

    const { gifts, activeGift } = useSelector( state => state.gifts );
    const { option } = useSelector( state => state.modal );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initValues);

    const { name, quantity, imageURL, toPerson, price } = formValues;

    const isDuplicating = useMemo(() => option === 'duplicate', [option]);

    const fileInputRef = useRef();

    useEffect(() => {
        activeGift ? setFormValues(activeGift) : setFormValues(initValues);
    }, [activeGift]);     

    const isFormValid = () => {
        if(name.length === 0 && quantity.length === 0 && imageURL.length === 0 && toPerson.length === 0 && price.length === 0)
            return false;
        else
            return true;
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleFileInputChange = ({ target }) => {
        if(target.files.length === 0)
            return;
        console.log(target.files);
        
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
                if(isFormValid())
                    dispatch( startAddingNewGift(newGift) );
                    setFormValues(initValues);
                    dispatch( closeModal() );
            }
            
        }else{
            if(option === 'edit'){
                const giftToEdit = {
                    name: name,
                    quantity: quantity, 
                    imageURL: imageURL,
                    toPerson: toPerson, 
                    price: price,
                    total: quantity * price
                }
                dispatch( startSavingGift(giftToEdit) );
                dispatch( deleteActiveGift() );
                dispatch( closeModal() );
            }else{
                const giftToDuplicate = {
                    name: name,
                    quantity: quantity, 
                    imageURL: imageURL,
                    toPerson: toPerson, 
                    price: price,
                    total: quantity * price
                }

                dispatch( startDuplicatingGift( giftToDuplicate ) );
                dispatch( deleteActiveGift() );
                dispatch( closeModal() );
            }
        }

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
                disabled={isDuplicating}
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
                disabled={isDuplicating}
            />

            <input
                type='file'
                onChange={ handleFileInputChange }
                style={{display: 'none'}}
                ref={fileInputRef}
            />

            <i
                className="fa-solid fa-cloud-arrow-up"
                onClick={() => fileInputRef.current.click()}
            ></i>

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
                disabled={isDuplicating}
            />

            <GiftButton
                type='submit'
            >
                Add a gift
            </GiftButton>

        </Form>
    )
}