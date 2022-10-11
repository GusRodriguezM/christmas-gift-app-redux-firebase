import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteGift, setActiveGift } from '../../store/slices/gifts';
import { openModal, setOption, setType } from '../../store/slices/modal';

import { GiftContainer } from '../styles/gifts/Gift.styled';
import { GiftButton } from '../styles/shared/Button.styled';
import { Group } from '../styles/shared/Group.styled';
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
        price: price
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
        dispatch( deleteGift(id) );
    }

    return (
        <GiftContainer>
            <Image alt={name} src={imageURL} />

            <Section>
                <h3>{name}</h3>
                <h3>{toPerson}</h3>
                <h3>({quantity}) - {total}</h3>
            </Section>

            <Group size='small'>
                <GiftButton
                    onClick={handleEditGift}
                >
                    Edit
                </GiftButton>

                <GiftButton
                    onClick={handleDuplicateGift}
                >
                    Duplicate
                </GiftButton>

                <GiftButton
                    onClick={handleDeleteGift}
                >
                    Delete
                </GiftButton>
            </Group>
        </GiftContainer>
    )
}