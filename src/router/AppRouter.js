import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthRoutes } from './AuthRoutes';
import { GiftsRoutes } from './GiftsRoutes';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {

    const status = useCheckAuth();

    //TODO: Make a component (spinner) to show the app is loading
    if(status === 'checking') 
        return (<h1>Loading...</h1>)

    return (
        <>
            <Routes>

                <Route path="auth/*" element={
                    <PublicRoute status={status} >
                        <Routes>
                            <Route path="/*" element={<AuthRoutes />} />
                        </Routes>
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute status={status} >
                        <GiftsRoutes />
                    </PrivateRoute>
                } />

            </Routes>

        </>
    )
}