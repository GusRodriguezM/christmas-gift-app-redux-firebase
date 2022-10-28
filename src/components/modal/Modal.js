import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActiveGift, deleteImageContent, resetSavingGift } from '../../store/slices/gifts';
import { closeModal } from '../../store/slices/modal/modalSlice';
import { ContentBody, HeaderFooter, ModalContainer, ModalContent } from '../styles/modal/ModalContainer.styled';
import { GiftButton } from '../styles/shared/Button.styled';

export const Modal = ({title, children}) => {

    const { open } = useSelector( state => state.modal );
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch( closeModal() );
        dispatch( deleteActiveGift() );
        dispatch( deleteImageContent() );
        dispatch( resetSavingGift() );
    }

    if(!open){
        return null;
    }

    return (
        <ModalContainer onClick={handleCloseModal}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <HeaderFooter>
                    <h3>{title}</h3>
                </HeaderFooter>
                
                <ContentBody>
                    {children}
                </ContentBody>

                <HeaderFooter>
                    <GiftButton
                        onClick={handleCloseModal}
                    >
                        <span>Close</span>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </GiftButton>
                </HeaderFooter>
            </ModalContent>
        </ModalContainer>
    )
}