import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckAuth } from '../hooks';

export const PrivateRoute = ({children}) => {

    const status = useCheckAuth();

    return (status === 'authenticated')
        ?   children
        :   <Navigate to="/auth/login" />
}