import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';
import { EmptyList } from './EmptyList';
import { Modal } from '../modal/Modal';
import { Visualize } from './Visualize';
import { GiftListToPrint } from './GiftListToPrint';

import { cleanList } from '../../store/slices/gifts';
import { openModal, setType } from '../../store/slices/modal';

import './styles.css';

export const GiftScreen = () => {

    const { gifts } = useSelector( state => state.gifts );
    const { type } = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const componentRef = useRef();

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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Gifts List'
    });

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

            <div style={{display: 'none'}}>
                <GiftListToPrint ref={componentRef} total={total} /> 
            </div>

            
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
                onClick={handlePrint}
            >
                Print
            </button>  

            <button
                onClick={handleCleanList}
            >
                Delete All
            </button>
        </div>
    )
}