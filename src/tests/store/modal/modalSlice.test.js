import { closeModal, modalSlice, openModal } from "../../../store/slices/modal/modalSlice";
import { initialState, openModalToAddGiftState, openModalToDuplicateGiftState, openModalToEditGiftState, visualizeModalState } from "../../fixtures/modalFixtures";

describe('Tests in the modalSlice file', () => {

    test('Should return the initial state and the reducer should be name "modal"', () => {

        //First we check that the name of the reducer is correct
        const state = modalSlice.reducer( initialState, {} );

        expect(state).toEqual( initialState );
        expect(modalSlice.name).toBe('modal');

    });

    test('Should do the openModal action to add a gift', () => {

        //Setting an object as if the modal was open to add a gift
        const modal = { type: 'form', option: '' };
        
        //Sending the object to the open modal reducer
        const state = modalSlice.reducer( initialState, openModal(modal) );

        //Expecting that the result object have the 'form' type
        expect(state).toEqual( openModalToAddGiftState );

    });

    test('Should do the openModal action to visualize the list of gifts', () => {

        //Setting an object as if the modal was open to add a visualize the list of gifts
        const modal = { type: 'visualize', option: '' };

        //Sending the object to the open modal reducer
        const state = modalSlice.reducer( initialState, openModal(modal) );

        //Expecting that the result object have the 'visualize' type
        expect(state).toEqual( visualizeModalState );

    });

    test('Should do the openModal action to edit a gift', () => {

        //Setting an object as if the modal was open to edit a gift
        const modal = { type: 'form', option: 'edit' };

        //Sending the object to the open modal reducer
        const state = modalSlice.reducer( initialState, openModal(modal) );

        //Expecting that the result object have the 'form' type and the 'edit' option
        expect(state).toEqual( openModalToEditGiftState );

    });

    test('Should do the openModal action to duplicate a gift', () => {

        //Setting an object as if the modal was open to duplicate a gift
        const modal = { type: 'form', option: 'duplicate' };

        //Sending the object to the open modal reducer
        const state = modalSlice.reducer( initialState, openModal(modal) );

        //Expecting that the result object have the 'form' type and the 'duplicate' option
        expect(state).toEqual( openModalToDuplicateGiftState );
    });

    test('Should do the closeModal action and set the open, type and/or form to its default state', () => {

        //Setting the initial state as if the modal was open to duplicate a gift and then we call the closeModal reducer
        const state = modalSlice.reducer( openModalToDuplicateGiftState, closeModal() );

        //Finally we expect that the result state is equal to the initial state (the default values)
        expect(state).toEqual( initialState );

    });

});