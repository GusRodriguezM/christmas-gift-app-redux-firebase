import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { GiftScreen } from '../components/gifts/GiftScreen';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="gifts" element={<GiftScreen />} />

                <Route path="login" element={<LoginScreen />} />
                <Route path="register" element={<RegisterScreen />} />

                <Route path="/" element={<Navigate to="/gifts" />} />
            </Routes>
        </>
    )
}
