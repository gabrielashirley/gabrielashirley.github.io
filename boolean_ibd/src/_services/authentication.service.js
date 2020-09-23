// This file contains the logic to login and logout of the application,
// To login, it posts the user's credentials to the /users/authenticate route on the api. 
// If authentication is successful, the user details including the token are added to local storage,
// and the current user is set in the application by calling currentUserSubject.next(user);

//The logged in user details are stored in local storage so the user will stay logged in if they refresh the browser and also between browser sessions until they explicitly logout.

import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers/handle-response';

const PORT = 4000;
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};
// explain the difference between currentUser and currentUserValue is at the end of this file


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    // alert("Inside login!!!" + username + " " + password);
    return fetch('http://hegemon.ucsd.edu:' + PORT + '/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            // alert("save to local storage")
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

/*
    currentUser observable can be used when you want a component to reactively update when a user logs in or out,
        for example: in the App.jsx component so it can show/hide the main nav bar when the user logs in/out. 
    
    currentUserValue property can be used when you just want to get the current value of the logged in user but don't need to reactively update when it changes
        for example: in the PrivateRoute.jsx component which restricts access to routes by checking if the user is currently logged in and authorised.
*/