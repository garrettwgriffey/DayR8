import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Validate } from './Validate';
import SignIn from '../components/pages/SignIn';

// We can make a context to give conditions for failing login - TM
// import { UserContext } from '../context/contexts/UserContext';

// This is a react Route that runs the sendValidation function before it mounts the page. If it passes and a user object is returned, it will return a react Route to the component. Otherwise it returns a SignIn component. - TM
export const PrivateRoute = ({ path, component }) => {
    let user = null;
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