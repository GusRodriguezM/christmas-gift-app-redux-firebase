import React from 'react';
import { useDispatch } from 'react-redux';

import { setActiveGift, startDeletingGift } from '../../store/slices/gifts';
import { openModal, setOption, setType } from '../../store/slices/modal';

import { GiftContainer } from '../styles/gifts/Gift.styled';
import { GiftButton } from '../styles/shared/Button.styled';
import { GiftButtonGroup } from '../styles/shared/Group.styled';
import { Image } from '../styles/shared/Image.styled';
import { Section } from '../styles/shared/Section.styled';

export const Gift = ({ id, name, quantity, imageURL, toPerson, price, total }) => {

    const dispatch = useDispatch();

    const gift = {
        id: id,
        name: name,
        quantity: quantity,
        imageURL: imageURL,
        toPerson: toPerson,
        price: price,
        total: total
    }

    const handleEditGift = () => {
        dispatch( setActiveGift( gift ) );
        dispatch( setType('form') );
        dispatch( setOption('edit') );
        dispatch( openModal() );
    }

    const handleDuplicateGift = () => {
        dispatch( setActiveGift( gift ) );
        dispatch( setType('form') );
        dispatch( setOption('duplicate') );
        dispatch( openModal() );
    }

    const handleDeleteGift = () => {
        dispatch( startDeletingGift(id) );
    }

    return (
        <GiftContainer>
            <Image alt={name} src={imageURL} loading='lazy' />

            <Section>
                <h3>{name}</h3>
                <h3>{toPerson}</h3>
                <h3>({quantity}) - {total}</h3>
            </Section>

            <GiftButtonGroup>
                <GiftButton
                    onClick={handleEditGift}
                >
                    <span>Edit</span>
                    <i className='fa-solid fa-pen-to-square'></i>
                </GiftButton>

                <GiftButton
                    onClick={handleDuplicateGift}
                >
                    <span>Duplicate</span>
                    <i className="fa-solid fa-copy"></i>
                </GiftButton>

                <GiftButton
                    onClick={handleDeleteGift}
                >
                    <span>Delete</span>
                    <i className="fa-solid fa-trash"></i>
                </GiftButton>
            </GiftButtonGroup>
        </GiftContainer>
    )
}