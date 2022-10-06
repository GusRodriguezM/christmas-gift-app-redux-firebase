import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckAuth } from '../hooks';

export const PublicRoute = ({children}) => {

    const status = useCheckAuth();

    return (status === 'non-authenticated')
        ?   children
        :   <Navigate to="/gifts" />
}