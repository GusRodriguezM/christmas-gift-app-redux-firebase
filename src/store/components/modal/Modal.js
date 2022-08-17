import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActiveGift } from '../../slices/gifts';
import { closeModal } from '../../slices/modal/modalSlice';

import './modal.css'

export const Modal = ({title, children}) => {

    const { open } = useSelector( state => state.modal );
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch( closeModal() );
        dispatch( deleteActiveGift() );
    }

    if(!open){
        return null;
    }

    return (
        <div className='modal' onClick={handleCloseModal}>
            <div className='modal__content' onClick={e => e.stopPropagation()}>
                <div className='modal__content--header'>
                    <h3 className='modal__content--title'>
                        {title}
                    </h3>
                </div>
                
                <div className='modal__content--body'>
                    {children}
                </div>

                <div className='modal__content--footer'>
                    <button
                        onClick={handleCloseModal}
                        className='button'
                    >
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}