import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children, status}) => {

    return (status === 'non-authenticated')
        ?   children
        :   <Navigate to="/gifts" />
}