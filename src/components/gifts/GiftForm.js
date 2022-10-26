import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActiveGift, startAddingNewGift, startDuplicatingGift, startSavingGift, startUploadingFile, deleteImageContent } from '../../store/slices/gifts';
import { closeModal } from '../../store/slices/modal';
import { defaultGifts } from '../../helpers/defaultGifts';
import { GiftButton } from '../styles/shared/Button.styled';
import Input from '../styles/elements/Input.styled';
import { Form } from '../styles/gifts/form/Form.styled';

const initValues = {
    name: '',
    quantity: '',
    toPerson: '',
    price: ''
}

export const GiftForm = () => {

    const { gifts, activeGift, imageContent } = useSelector( state => state.gifts );
    const { option } = useSelector( state => state.modal );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initValues);

    const { name, quantity, toPerson, price } = formValues;

    const isDuplicating = useMemo(() => option === 'duplicate', [option]);

    const fileInputRef = useRef();

    useEffect(() => {
        activeGift ? setFormValues(activeGift) : setFormValues(initValues);
    }, [activeGift]);     

    const isFormValid = () => {
        if(name.length === 0 && quantity.length === 0 && imageContent.imageURL.length === 0 && toPerson.length === 0 && price.length === 0)
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
        
        dispatch( startUploadingFile(target.files) );
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!activeGift){
            const newGift = {
                name: name,
                price: price,
                toPerson: toPerson,
                quantity: quantity,
                imageURL: imageContent.imageURL,
                total: quantity * price
            }

            const duplicate = gifts.some(gift => gift.name.toLowerCase() === newGift.name.toLowerCase());
    
            if(duplicate){
                console.log('Please do not repeat the gift. Show some more love');
            }else{
                if(isFormValid())
                    dispatch( startAddingNewGift(newGift) );
                    setFormValues(initValues);
                    dispatch( deleteImageContent() );
                    dispatch( closeModal() );
            }
            
        }else{
            if(option === 'edit'){
                const giftToEdit = {
                    name: name,
                    quantity: quantity, 
                    imageURL: imageContent.imageURL === '' ? activeGift.imageURL : imageContent.imageURL,
                    toPerson: toPerson, 
                    price: price,
                    total: quantity * price
                }
                dispatch( startSavingGift(giftToEdit) );
                dispatch( deleteActiveGift() );
                dispatch( deleteImageContent() );
                dispatch( closeModal() );
            }else{
                const giftToDuplicate = {
                    quantity: quantity, 
                    toPerson: toPerson, 
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
                <span>Surprise</span>
                <i className="fa-solid fa-shuffle"></i>
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
                type='file'
                accept='image/*'
                onChange={ handleFileInputChange }
                style={{display: 'none'}}
                ref={fileInputRef}
                disabled={isDuplicating}
            />

            <label>Upload your image:</label>

            <i
                className="fa-solid fa-cloud-arrow-up"
                onClick={() => fileInputRef.current.click()}
            ></i>

            <span>{imageContent.name}</span>

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
                <span>Add a gift</span>
                <i className="fa-solid fa-circle-plus"></i>
            </GiftButton>

        </Form>
    )
}