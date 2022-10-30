import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';
import { EmptyList } from './EmptyList';
import { Modal } from '../modal/Modal';
import { Visualize } from './Visualize';
import { GiftListToPrint } from './GiftListToPrint';

import { setSavingGift, startDeletingGifts } from '../../store/slices/gifts';
import { openModal } from '../../store/slices/modal';

import Main from '../styles/gifts/screen/Main.styled';
import { GiftButton } from '../styles/shared/Button.styled';
import { MainButtonGroup } from '../styles/shared/Group.styled';
import { Print } from '../styles/gifts/list/List.styled';
import { Span } from '../styles/shared/Span.styled';

export const GiftScreen = () => {

    const { gifts, isSaving } = useSelector( state => state.gifts );
    const { type } = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const componentRef = useRef();

    const [total, setTotal] = useState(0);

    const handleCleanList = () => {
        dispatch( startDeletingGifts() );
    }

    const handleOpenModal = () => {
        dispatch( openModal({type: 'form', option: ''}) );
        dispatch( setSavingGift() );
    }

    const handleVisualizeModal = () => {
        dispatch( openModal({type: 'visualize', option: ''}) );
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
        <Main>

            <h1>Gifts:</h1>

            <GiftButton
                onClick={handleOpenModal}
                disabled={isSaving}
                inactive={isSaving}
            >
                <span>Add Gift</span>
                <i className="fa-solid fa-circle-plus"></i>
            </GiftButton>

            <Modal title={type === 'form' ? 'Form' : 'Visualize'}>

                {
                    type === 'form'
                        ?   (<GiftForm />)
                        :   (<Visualize />)
                }
                
            </Modal>

            <Print>
                <GiftListToPrint ref={componentRef} total={total} /> 
            </Print>

            
            {
                gifts.length === 0 
                    ? (<EmptyList />)
                    : (<GiftsList />)
            }

            <Span>
                <h1>Total: {total}</h1>
            </Span>

            <MainButtonGroup>
                <GiftButton
                    onClick={handleVisualizeModal}
                >
                    <span>Visualize</span>
                    <i className="fa-solid fa-eye"></i>
                </GiftButton>

                <GiftButton
                    onClick={handlePrint}
                >
                    <span>Print</span>
                    <i className="fa-solid fa-print"></i>
                </GiftButton>  

                <GiftButton
                    onClick={handleCleanList}
                >
                    <span>Delete All</span>
                    <i className="fa-solid fa-dumpster"></i>
                </GiftButton>
            </MainButtonGroup>
        </Main>
    )
}