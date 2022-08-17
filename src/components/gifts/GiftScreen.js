import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';
import { EmptyList } from './EmptyList';
import { Modal } from '../modal/Modal';

import { cleanList } from '../../store/slices/gifts';
import { openModal } from '../../store/slices/modal';

import './styles.css';

export const GiftScreen = () => {

    const { gifts } = useSelector( state => state.gifts );
    const dispatch = useDispatch();

    const handleCleanList = () => {
        dispatch( cleanList() );
    }

    const handleOpenModal = () => {
        dispatch( openModal() );
    }

    return (
        <div className='gifts'>

            <button
                onClick={handleOpenModal}
            >
                Add Gift
            </button>

            <Modal title={'Form'}>
                <GiftForm />
            </Modal>
            
            {
                gifts.length === 0 
                    ? (<EmptyList />)
                    : (<GiftsList />)
            }            

            <button
                onClick={handleCleanList}
            >
                Delete All
            </button>
        </div>
    )
}