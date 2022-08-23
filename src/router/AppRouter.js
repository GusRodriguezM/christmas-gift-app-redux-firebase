import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthRoutes } from './AuthRoutes';
import { GiftsRoutes } from './GiftsRoutes';

export const AppRouter = () => {

    return (
        <>
            <Routes>

                <Route path="auth/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<AuthRoutes />} />
                        </Routes>
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute>
                        <GiftsRoutes />
                    </PrivateRoute>
                } />

            </Routes>

        </>
    )
}