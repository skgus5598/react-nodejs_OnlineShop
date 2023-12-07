import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    let isLogin = useSelector( (state) => state.persistedReducer.user_rd.loginCheck);
    return(
        isLogin 
        ? <Outlet />
        : <Navigate to={"/login"} />   
    );
};
    

export default PrivateRoute;