import axios from 'axios';

export const Validate = () => {
    const response = axios({
        method: 'GET',
        url: '/api/login'
    });
    console.log(response);
    return response;
};