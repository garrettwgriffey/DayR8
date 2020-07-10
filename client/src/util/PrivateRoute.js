import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Validate } from './Validate';
import SignIn from '../components/pages/SignIn';
// We can make a context to give conditions for failing login - TM
// import { UserContext } from '../context/contexts/UserContext';

export const PrivateRoute = ({ path, component }) => {
    const user = null;
    useEffect(() => {
        const sendValidation = async () => {
            try {
                await Validate().then((res) => user = res);
            } catch (error) {
                console.log(error);
            }
        };
        sendValidation();
    });
    return user ? (
        <Route exact path={path} component={component} />
    ) : (
        <Redirect to="/" component={SignIn} />
    );
};