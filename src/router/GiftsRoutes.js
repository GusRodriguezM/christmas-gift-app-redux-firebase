import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GiftScreen } from '../components/gifts/GiftScreen';
import { Navbar } from '../components/navbar/Navbar';

export const GiftsRoutes = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="gifts" element={<GiftScreen />} />

                <Route path="/*" element={<Navigate to="/gifts"/> } />
            </Routes>
        </>
    )
}
