import { addGift, cleanList, clearGiftsLogout, deleteActiveGift, deleteGiftById, deleteImageContent, duplicateGift, editGift, giftsSlice, resetSavingGift, setActiveGift, setGifts, setImageContent, setSavingGift } from "../../../store/slices/gifts/giftsSlice";
import { gift, addGiftState, duplicateGiftState, editGiftState, giftToDuplicate, giftToEdit, initialState, addGiftStateWithActiveGift, gifts, isSavingInitialState, initialStateWithImageContent, imageCloudinary } from "../../fixtures/giftsFixtures";

describe('Tests in the giftSlice file', () => {

    test('Should return the initial state and the reducer should be named "gifts"', () => {
        
        const state = giftsSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
        expect(giftsSlice.name).toBe('gifts');

    });

    test('Should add a gift to the gifts state', () => {

        const state = giftsSlice.reducer( initialState, addGift( gift ) );
        expect(state).toEqual( addGiftState );

    });

    test('Should edit a gift in the gifts state', () => {

        const state = giftsSlice.reducer( addGiftState, editGift( giftToEdit ) );
        expect(state).toEqual( editGiftState );


    });

    test('Should duplicate a gift in the gifts state', () => {

        const state = giftsSlice.reducer( addGiftState, duplicateGift( addGiftState.gifts[0].id, giftToDuplicate ) );
        expect(state).toEqual( duplicateGiftState );

    });

    test('Should delete a gift by the id', () => {

        const state = giftsSlice.reducer( addGiftState, deleteGiftById(addGiftState.gifts[0].id) );
        expect(state).toEqual( initialState );

    });

    test('Should clean the list of gifts', () => {

        const state = giftsSlice.reducer( duplicateGiftState, cleanList() );
        expect(state).toEqual( initialState );

    });

    test('Should set a gift as activeGift in the state', () => {
        
        const state = giftsSlice.reducer( addGiftState, setActiveGift( addGiftState.gifts[0] ) );
        expect(state).toEqual( addGiftStateWithActiveGift );

    });

    test('Should delete the active gift from the state', () => {

        const state = giftsSlice.reducer( addGiftStateWithActiveGift, deleteActiveGift() );
        expect(state).toEqual( addGiftState );

    });

    test('Should fill the gifts array of the state', () => {

        const state = giftsSlice.reducer( initialState, setGifts( gifts ) );
        expect(state).toEqual( duplicateGiftState );

    });

    test('Should change the isSaving property to "true"', () => {

        const state = giftsSlice.reducer( initialState, setSavingGift() );
        expect(state).toEqual( isSavingInitialState );

    });

    test('Should change the isSaving property to "false"', () => {

        const state = giftsSlice.reducer( isSavingInitialState, resetSavingGift() );
        expect(state).toEqual( initialState );

    });

    test('Should clean the gifts state after a logout (get back to the default values)', () => {

        const state = giftsSlice.reducer( addGiftStateWithActiveGift, clearGiftsLogout() );
        expect(state).toEqual( initialState );

    });

    test('Should set the imageContent', () => {
        
        const state = giftsSlice.reducer( initialState, setImageContent( imageCloudinary ) );
        expect(state).toEqual( initialStateWithImageContent );

    });

    test('Should delete the imageContent values', () => {

        const state = giftsSlice.reducer( initialStateWithImageContent, deleteImageContent() );
        expect(state).toEqual( initialState );
        
    });

});