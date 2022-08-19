import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';
import { EmptyList } from './EmptyList';
import { Modal } from '../modal/Modal';

import { cleanList } from '../../store/slices/gifts';
import { openModal, setType } from '../../store/slices/modal';

import './styles.css';
import { Visualize } from './Visualize';

export const GiftScreen = () => {

    const { gifts } = useSelector( state => state.gifts );
    const { type } = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);

    console.log(gifts);

    const handleCleanList = () => {
        dispatch( cleanList() );
    }

    const handleOpenModal = () => {
        dispatch( setType('form') );
        dispatch( openModal() );
    }

    const handleVisualizeModal = () => {
        dispatch( setType('visualize') );
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

            <Modal title={type === 'form' ? 'Form' : 'Visualize'}>

                {
                    type === 'form'
                        ?   (<GiftForm />)
                        :   (<Visualize />)
                }
                
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
                onClick={handleVisualizeModal}
            >
                Visualize    
            </button>       

            <button
                onClick={handleCleanList}
            >
                Delete All
            </button>
        </div>
    )
}