import axios from 'axios';
// This should run when the user logs in and also whenever we want to check their login status before they view something. This route returns a user object with their login info, if they aren't logged in then we will need to handle that instance on the PrivateRoute.js - TM
export const Validate = () => {
    const response = axios({
        method: 'GET',
        url: '/api/login'
    });
    console.log(response);
    return response;
};