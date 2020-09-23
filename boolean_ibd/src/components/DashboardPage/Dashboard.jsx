import React, { useState, useEffect } from 'react';
import { userService } from "../../_services/user.service"
import { authenticationService } from "../../_services/authentication.service"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import GeneSearch from '../Shared/GeneSearch';
import SidebarNav from './SidebarNav';
import TherapeuticIndex from '../Features/TherapeuticIndex';
import IBDMap from '../Features/IBDMap';
import IBDOutcome from '../Features/IBDOutcome';
import IBDGender from '../Features/IBDGender';
import UCMap from '../Features/UCMap';
import CDMap from '../Features/CDMap';
import MouseModel from '../Features/MouseModel';
import Grid from '@material-ui/core/Grid';
import EMTHealingIndex from '../Features/EMTHealingIndex';
import UpgradePlan from './Components/Upgrade';
import Profile from './Components/Profile';
import ColonTissue from '../Features/ColonTissue';
import { Role } from "../../_helpers/role";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    drawer: {
        width: 240,
        marginTop: 74,
        height: 'calc(100% - 74px)'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        width: 'calc(100% - 240px)',
        height: 'calc(100% - 73px)',
        marginLeft: '240px',
    },
}));



export default function Dashboard() {
    const classes = useStyles();
    const [tab, setTab] = useState("");
    const [geneSelected, setGeneSelected] = useState([]);
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    const [userFromApi, setUserFromApi] = useState(null);
    const errorAccessMessage = "Sorry, but this feature is restricted to Premium users. Please upgrade your membership to unlock today!";

    {/* useEffect hook which can replace both componentDidMount and componentDidUpdate. 
    To run the hook only once we can use the second argument to useEffect — an array of values that the effect depends on. 
    By default, the effect will run when any of the props or state changes. 
    If we pass an empty array, the effect will only run on first render. */}

    // fetch user's data from backend for role 
    useEffect(() => {
        userService.getById(currentUser.id).then(userFromApi => setUserFromApi(userFromApi));
    }, []);


    return (
        // <div>
        //         <p>Your role is: <strong>{currentUser.role}</strong>.</p>
        //          <div>
        //             Current user from secure api end point:
        //             {userFromApi &&
        //                 <ul>
        //                     <li>{userFromApi.firstName} {userFromApi.lastName}</li>
        //                 </ul>
        //             }
        //         </div>
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawer }}
            >
                <Profile />
                <SidebarNav onClick={setTab} />
                {
                    (currentUser.role !==  Role.Premium && currentUser.role !== Role.Admin) &&
                    <UpgradePlan />
                }
            </Drawer>

            <main className={classes.content}>
                <GeneSearch geneSelected={geneSelected} setGeneSelected={setGeneSelected} />
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        {/* <Something onClick={update.bind(null, props.x)} /> */}
                        {((tab === "5" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin)) ? <EMTHealingIndex geneSelected={geneSelected} /> : null}
                        {((tab === "6" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin))? <IBDOutcome geneSelected={geneSelected} /> : null}
                        {((tab === "8" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin))? <IBDGender geneSelected={geneSelected} /> : null}
                        {((tab === "9" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin))? <MouseModel geneSelected={geneSelected} /> : null}
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={8}>
                        {tab === "1"? <TherapeuticIndex geneSelected={geneSelected} /> : null}
                        {((tab === "2" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin))? <IBDMap geneSelected={geneSelected} /> : null}
                        {((tab === "3" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin))? <UCMap geneSelected={geneSelected} /> : null}
                        {((tab === "4" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin))? <CDMap geneSelected={geneSelected} /> : null}
                        {((tab === "7" && currentUser.role === Role.Premium) || (currentUser.role === Role.Admin)) ? <ColonTissue geneSelected={geneSelected} /> : null}
                    </Grid>
                </Grid>
            </main>
        </div>

    );
}