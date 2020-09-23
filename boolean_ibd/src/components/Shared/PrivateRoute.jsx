// This file will renders a route component if the user is logged in and in an authorised role for the route
// if the user isn't logged in, they're redirected to the /login page
// if the user is logged in but aren't in an authorised role they're redirected to the home page

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "../../_services/authentication.service"



export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to therapeutic index page (since everyone can access this page)
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)