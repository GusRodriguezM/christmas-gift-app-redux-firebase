import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../router/PublicRoute";
import { authSlice } from "../../store/slices/auth/authSlice";
import { authenticatedState, nonAuthenticatedState } from "../fixtures/authFixtures";

describe('Tests in <PublicRoute />', () => {

    test('Should show the children if the user is not authenticated', () => {

        //Making the mock of the store with an auth state when the user is not logged in
        const store = configureStore({
            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: nonAuthenticatedState
            }
        });

        //Getting the status from the auth state
        const status = store.getState().auth.status;

        //Rendering the component
        render(
            <Provider store={ store } >
                {/* Sending the status as a prop */}
                <PublicRoute status={ status } >
                    <h1>Public route</h1>
                </PublicRoute>
            </Provider>
        );

        //Expecting that the children (h1 tag) is in the document
        expect( screen.getByText('Public route') ).toBeTruthy();

    });

    test('Should navigate if the user is authenticated', () => {

        //Making the mock of the store with an auth state when the user is logged in
        const store = configureStore({
            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: authenticatedState
            }
        });

        //Getting the status from the auth state
        const status = store.getState().auth.status;

        //Rendering the component
        render(
            <Provider store={ store } >
                {/* This case is different. We need to create a Router to check if the user is logged
                    then send to the private route (/gifts) and render the Gifts Screen
                */}
                <MemoryRouter initialEntries={['/auth/login']}>
                    <Routes>
                        <Route path='/auth/login' element={
                            <PublicRoute status={ status } >
                                <h1>Public route</h1>
                            </PublicRoute>
                        } />
                        <Route path='gifts' element={ <h1>Gifts Screen</h1> } />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        //Expecting that the content of the h1 appears in the document
        expect( screen.getByText('Gifts Screen') ).toBeTruthy();

    });

});