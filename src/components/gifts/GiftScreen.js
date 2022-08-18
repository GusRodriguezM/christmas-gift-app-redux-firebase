import React, { useEffect, useState } from 'react';
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

    const [total, setTotal] = useState(0);

    console.log(gifts);

    const handleCleanList = () => {
        dispatch( cleanList() );
    }

    const handleOpenModal = () => {
        dispatch( openModal() );
    }

    useEffect(() => {
        let auxTotal = [];

        if(gifts.length !== 0){
            gifts.map(gift => auxTotal.push(gift.total));
            setTotal( auxTotal.reduce((prevVal, currVal) => prevVal + currVal ));
        }else{
            setTotal(0);
        }
    }, [gifts]);
    

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

            <span>
                Total: {total}
            </span>         

            <button
                onClick={handleCleanList}
            >
                Delete All
            </button>
        </div>
    )
}