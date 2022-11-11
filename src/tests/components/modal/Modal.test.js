import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Modal } from "../../../components/modal/Modal";
import theme from "../../../components/styles/theme/theme";
import { deleteActiveGift, deleteImageContent, resetSavingGift } from "../../../store/slices/gifts/giftsSlice";
import { closeModal, modalSlice } from "../../../store/slices/modal/modalSlice";
import { initialState, openModalToAddGiftState } from "../../fixtures/modalFixtures";

//Mocking the functions used by the modal
const mockCloseModal = jest.fn();
const mockDeleteActiveGift = jest.fn();
const mockDeleteImageContent = jest.fn();
const mockResetSavingGift = jest.fn();

//Making a mock of the closeModal only
jest.mock('../../../store/slices/modal/modalSlice', () => ({
    ...jest.requireActual('../../../store/slices/modal/modalSlice'),
    closeModal: () => mockCloseModal
}));

jest.mock('../../../store/slices/gifts/giftsSlice', () => ({
    deleteActiveGift: () => mockDeleteActiveGift,
    deleteImageContent: () => mockDeleteImageContent,
    resetSavingGift: () => mockResetSavingGift
}));

describe('Tests in the <Modal /> component', () => {
    
    //Variables to send to the modal
    const title = 'Testing';
    const content = 'Content in the modal';

    //Mocking the store with the modalSlice
    const getMockStore = ( initState ) => {
        return configureStore({
            reducer: {
                modal: modalSlice.reducer
            },
            preloadedState: {
                modal: initState
            }
        });
    }
    
    test('Should not render the component if open is equal to false', () => {

        //Getting the store
        const store = getMockStore( {...initialState} );

        //Rendering the component
        //This should not render the modal
        const { container } = render(
            <Provider store={ store } >
                <ThemeProvider theme={ theme } >
                    <Modal title={ title } >
                        <h1>{content}</h1>
                    </Modal>
                </ThemeProvider>
            </Provider>
        );

        //Expecting that the container matches with the snapshot
        expect( container ).toMatchSnapshot();
    
    });

    test('Should render the component if open is equal to true', () => {

        //Getting the store
        const store = getMockStore( {...openModalToAddGiftState} );

        //Rendering the component
        const { container } = render(
            <Provider store={ store } >
                <ThemeProvider theme={ theme } >
                    <Modal title={ title } >
                        <h1>{content}</h1>
                    </Modal>
                </ThemeProvider>
            </Provider>
        );

        //Expecting that the container matches with the snapshot
        expect( container ).toMatchSnapshot();
        
        //If the above is ok then in the modal should appear the h tags for the title and content
        expect( screen.getByRole('heading', { level: 3, name: `${title}` }) ).toBeTruthy();
        expect( screen.getByRole('heading', { level: 1, name: `${content}` }) ).toBeTruthy();

    });

    test('Close button should call closeModal, deleteActiveGift, deleteImageContent, resetSavingGift actions', () => {

        //Getting the store
        const store = getMockStore( {...openModalToAddGiftState} );

        //Rendering the component
        render(
            <Provider store={ store } >
                <ThemeProvider theme={ theme } >
                    <Modal title={ title } >
                        <h1>{content}</h1>
                    </Modal>
                </ThemeProvider>
            </Provider>
        );

        //Getting the reference to the button
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        
        //Firing the event
        fireEvent.click( closeBtn );

        //Expecting that the actions have been called after clicking the button
        expect( mockCloseModal ).toHaveBeenCalled();
        expect( mockDeleteActiveGift ).toHaveBeenCalled();
        expect( mockDeleteImageContent ).toHaveBeenCalled();
        expect( mockResetSavingGift ).toHaveBeenCalled();

    });

});