// This file contains just a couple of methods for retrieving user data from the api,
// it acts as the interface between the React application and the backend api.

// import config from 'config';     // not using webpack
import { authHeader } from "../_helpers/auth-header"
import { handleResponse } from '../_helpers/handle-response';

// const config = JSON.stringify({
//     apiUrl: 'http://localhost:3000'
// });

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch("http://localhost:3000/users", requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/users/${id}`, requestOptions).then(handleResponse);
}