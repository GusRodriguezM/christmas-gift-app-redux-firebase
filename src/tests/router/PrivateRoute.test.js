import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { authSlice } from "../../store/slices/auth";
import { authenticatedState, nonAuthenticatedState } from "../fixtures/authFixtures";

describe('Tests in <PrivateRoute />', () => {

    test('Should show the children if the user is authenticated', () => {

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
                {/* Sending the status as a prop */}
                <PrivateRoute status={ status } >
                    <h1>Private route</h1>
                </PrivateRoute>
            </Provider>
        );
        
        //Expecting that the h1 tag is in the document
        expect( screen.getByText('Private route') ).toBeTruthy();

    });

    test('Should navigate if the user is not authenticated', () => {

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
                <MemoryRouter initialEntries={['/gifts']} >
                    <Routes>
                        <Route path='/gifts' element={
                            <PrivateRoute status={ status } >
                                <h1>Private Route</h1>
                            </PrivateRoute>
                        } />
                        <Route path='/auth/login' element={ <h1>Login Page</h1> } />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        //Expecting the h1 tag appears in the document
        expect( screen.getByText('Login Page') ).toBeTruthy();

    });

});