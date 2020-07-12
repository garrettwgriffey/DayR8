import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SignUp from '../components/pages/SignUp';
// We can make a context to give conditions for failing login - TM
// import { UserContext } from '../context/contexts/UserContext';

// This just checks if a user is logged in to decide whether to display the hidden component or redirect to the signup. Sign in default sends it to an infinite loop which we need to locate the source of. - TM
export const PrivateRoute = ({ user, path, component }) => {
    return user ? (
        <Route exact path={path} component={component} />
    ) : (
        <Redirect to="/signup" component={SignUp} />
    );
};