import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SignIn from '../components/pages/SignIn';
// We can make a context to give conditions for failing login - TM
// import { UserContext } from '../context/contexts/UserContext';

// This just checks if a user is logged in to decide whether to display the hidden component or redirect to the signin. - TM
export const PrivateRoute = ({ user, path, component }) => {
    return user ? (
        <Route exact path={path} component={component} />
    ) : (

        <Redirect to="/" component={SignIn} />

    );
};