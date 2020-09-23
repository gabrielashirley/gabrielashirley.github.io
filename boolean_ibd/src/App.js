import React from "react";
import { Route, Router } from "react-router-dom";
import "./App.css";
import LandingPage from './components/LandingPage/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/DashboardPage/Dashboard';

// authentication and authorization helper
import { history } from './_helpers/history';
import { Role } from "./_helpers/role";
import { authenticationService } from './_services/authentication.service';
import { PrivateRoute } from './components/Shared/PrivateRoute';
import { AdminPage } from "./AdminPage/AdminPage";
import HeaderDashboard from "./components/DashboardPage/Components/HeaderDashboard";
import HeaderLanding from './components/LandingPage/HeaderLanding';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            isPremium: false,
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        // subscribes to the currentUser observable in the authentication service so 
        // it can reactively show/hide the main navigation bar when the user logs in/out of the application. 
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin,
            isPremium: x && x.role === Role.Premium
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/');
    }


    render() {
        const { currentUser, isAdmin, isPremium } = this.state;
        return ( <
            Router history = { history } >
            <
            div >

            { /* if the user is logged in, display <HeaderDashboard/>. Else, display <HeaderLanding/> */ } {
                currentUser ? < HeaderDashboard logout = { this.logout }
                /> : <HeaderLanding / >
            }


            { /* TODO:  change navbar depending on whether the user is at landing page/login page/sign up page or Dash board*/ }

            <
            Route path = "/boolean_ibd"
            name = "Landing Page"
            component = { LandingPage }
            />  <
            Route path = "/boolean_ibd/login"
            name = "Login Page"
            component = { Login }
            />  <
            Route path = "/boolean_ibd/signup"
            name = "Signup Page"
            component = { Signup }
            />  <
            Route path = "/boolean_ibd/forgotpassword"
            name = "Forgot Password Page"
            component = { ForgotPassword }
            />  <
            PrivateRoute exact path = "/boolean_ibd/dashboard"
            name = "Dashboard Page"
            component = { Dashboard }
            /> <
            PrivateRoute path = "/boolean_ibd/admin"
            roles = {
                [Role.Admin]
            }
            component = { AdminPage }
            /> < /
            div > <
            /Router>
        )
    }
}

export default App;