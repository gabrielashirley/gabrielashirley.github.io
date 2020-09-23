import React from 'react';
import { Button, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Shared/Footer';
import { authenticationService } from "../_services/authentication.service";
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();

    if (authenticationService.currentUserValue) {
        console.log(authenticationService.currentUserValue);
        history.push('/dashboard');
    }

    async function handleSubmit(values) {
        const loginData = {
            username: values.username,
            password: values.password
        }

        authenticationService.login(loginData.username, loginData.password)
            .then(
                response => {
                    history.push('/dashboard')
                }, error => {
                    console.log(error);
                }
            )
    }


    function validate(values) {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h6" variant="h6">
                        Login
                    </Typography>
                    <Form
                        onSubmit={handleSubmit}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, values }) => (
                            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    type="password"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={submitting}
                                >
                                    Login
                                </Button>
                            </form>
                        )}
                    />
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgotpassword" variant="body2">
                                Forgot password
                          </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign Up
                          </Link>
                        </Grid>
                    </Grid>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
            <Footer />
        </React.Fragment>
    );
}
