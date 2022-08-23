import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {

    const { logged } = useSelector( state => state.auth );

    return (!logged)
        ?   children
        :   <Navigate to="/gifts" />
}