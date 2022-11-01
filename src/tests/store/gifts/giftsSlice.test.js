import { addGift, cleanList, clearGiftsLogout, deleteActiveGift, deleteGiftById, deleteImageContent, duplicateGift, editGift, giftsSlice, resetSavingGift, setActiveGift, setGifts, setImageContent, setSavingGift } from "../../../store/slices/gifts/giftsSlice";
import { gift, addGiftState, duplicateGiftState, editGiftState, giftToDuplicate, giftToEdit, initialState, addGiftStateWithActiveGift, gifts, isSavingInitialState, initialStateWithImageContent, imageCloudinary } from "../../fixtures/giftsFixtures";

describe('Tests in the giftSlice file', () => {

    //Checking if the name of the slice is correct
    test('Should return the initial state and the reducer should be named "gifts"', () => {
        
        const state = giftsSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
        expect(giftsSlice.name).toBe('gifts');

    });
    
    test('Should add a gift to the gifts state', () => {
        
        //First we call the action to add a gift
        const state = giftsSlice.reducer( initialState, addGift( gift ) );
        //If the response of the action creator is the same as the mocked object then the test pass
        expect(state).toEqual( addGiftState );

    });

    test('Should edit a gift in the gifts state', () => {

        //We take the mocked state that have one object and then call an action to edit the gift
        const state = giftsSlice.reducer( addGiftState, editGift( giftToEdit ) );
        //We expect the result to be the same as the state with the edited gift
        expect(state).toEqual( editGiftState );

    });

    test('Should duplicate a gift in the gifts state', () => {

        /**
         * In this test the gift to duplicate the first gift from the list (addGiftState), then its id and the 
         * gift to duplicate is send as an argument too 
         */
        const state = giftsSlice.reducer( addGiftState, duplicateGift( addGiftState.gifts[0].id, giftToDuplicate ) );
        //Finally if the comparison of the result with the mock object is true then the test passes
        expect(state).toEqual( duplicateGiftState );

    });

    test('Should delete a gift by the id', () => {
        
        //To test this action we need just the id as an argument
        const state = giftsSlice.reducer( addGiftState, deleteGiftById(addGiftState.gifts[0].id) );
        //To see if the action is correct the initial state is compared with the result
        expect(state).toEqual( initialState );

    });

    test('Should clean the list of gifts', () => {

        //If we have a list of two gifts and "dispatch" the action to delete all the list. The expected output must be an empty list
        const state = giftsSlice.reducer( duplicateGiftState, cleanList() );
        //If the response is equal to the initial state then the test passes
        expect(state).toEqual( initialState );

    });

    test('Should set a gift as activeGift in the state', () => {
        
        //The state with one gift is used set the active gift
        const state = giftsSlice.reducer( addGiftState, setActiveGift( addGiftState.gifts[0] ) );
        //The gift with one gift in the array of gifts and an active gift should be equal to the response from the action
        expect(state).toEqual( addGiftStateWithActiveGift );

    });

    test('Should delete the active gift from the state', () => {

        //If it's an active gift in the state this action will delete it
        const state = giftsSlice.reducer( addGiftStateWithActiveGift, deleteActiveGift() );
        //Finally the comparison with the state with the activeGift property in null
        expect(state).toEqual( addGiftState );

    });

    test('Should fill the gifts array of the state', () => {
        
        //This test is make to see if the action takes an array of gifts and fill the array in the state
        const state = giftsSlice.reducer( initialState, setGifts( gifts ) );
        //Finally the state is compared with another with the same number of gifts (and the same values)
        expect(state).toEqual( duplicateGiftState );

    });

    //This test just changes the value of the isSaving property as well as the test below
    test('Should change the isSaving property to "true"', () => {

        const state = giftsSlice.reducer( initialState, setSavingGift() );
        expect(state).toEqual( isSavingInitialState );

    });

    test('Should change the isSaving property to "false"', () => {

        const state = giftsSlice.reducer( isSavingInitialState, resetSavingGift() );
        expect(state).toEqual( initialState );

    });

    test('Should clean the gifts state after a logout (get back to the default values)', () => {

        //This action deletes all the data in the gifts slice
        const state = giftsSlice.reducer( addGiftStateWithActiveGift, clearGiftsLogout() );
        //Finally the initial state is compare with the response from the action
        expect(state).toEqual( initialState );

    });

    test('Should set the imageContent', () => {
        
        //To test the action first it needed to use the object we get as a response from cloudinary
        const state = giftsSlice.reducer( initialState, setImageContent( imageCloudinary ) );
        //If the data from the image is set in the state then the test passes
        expect(state).toEqual( initialStateWithImageContent );

    });

    test('Should delete the imageContent values', () => {

        //This test just cleans the image content from the state
        const state = giftsSlice.reducer( initialStateWithImageContent, deleteImageContent() );
        //We can compare it to an initial state
        expect(state).toEqual( initialState );
        
    });

});