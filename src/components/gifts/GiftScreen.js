import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { GiftForm } from './GiftForm';
import { GiftsList } from './GiftsList';
import { EmptyList } from './EmptyList';
import { Modal } from '../modal/Modal';
import { Visualize } from './Visualize';
import { GiftListToPrint } from './GiftListToPrint';

import { cleanList, startNewGift } from '../../store/slices/gifts';
import { openModal, setType } from '../../store/slices/modal';

import Main from '../styles/gifts/screen/Main.styled';
import { GiftButton } from '../styles/shared/Button.styled';
import { Group } from '../styles/shared/Group.styled';
import { Print } from '../styles/gifts/list/List.styled';
import { Span } from '../styles/shared/Span.styled';

export const GiftScreen = () => {

    const { gifts, isSaving } = useSelector( state => state.gifts );
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
        dispatch( startNewGift() );
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
        <Main>

            <Span>
                <h1>Gifts:</h1>
            </Span>

            <GiftButton
                onClick={handleOpenModal}
                disabled={isSaving}
                inactive={isSaving}
            >
                Add Gift
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

            <Group size='large'>
                <GiftButton
                    onClick={handleVisualizeModal}
                >
                    Visualize    
                </GiftButton>

                <GiftButton
                    onClick={handlePrint}
                >
                    Print
                </GiftButton>  

                <GiftButton
                    onClick={handleCleanList}
                >
                    Delete All
                </GiftButton>
            </Group>
        </Main>
    )
}