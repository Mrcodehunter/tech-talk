import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
export default function PublicRoute ()  {
    const {currentUser} = useAuthContext();
    return !currentUser ? <Outlet /> : <Navigate to="/" />;
}