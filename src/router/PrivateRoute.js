import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children, status}) => {

    return (status === 'authenticated')
        ?   children
        :   <Navigate to="/auth/login" />
}