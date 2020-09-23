import React, { useState } from 'react';
import { Button, CssBaseline, Link, Grid, Typography, Container, FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Shared/Footer';
import axios from 'axios';
import { authenticationService } from "../_services/authentication.service"
// import { Role } from "../_helpers/role";
import { useHistory } from 'react-router-dom';
import { Form } from 'react-final-form';
import { TextField, Radios } from 'mui-rff';

const PORT = 4000;

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();

  const [newUser, setNewUser] = useState(null);

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validate(values) {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!!values.email && !validateEmail(values.email)) {
      errors.email = 'Invalid email';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.password = 'Required';
    }
    if (!!values.password && !!values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password does not match';
    }
    if (!values.userType) {
      errors.userType = 'User type is required';
    }
    return errors;
  }

  // when the user submit the registration form, send a POST request to save user to database
  async function handleSubmit(values) {
    setNewUser("test");

    const signUpData = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.userType           // role is a field in database
    }
    axios.post('http://hegemon.ucsd.edu:' + PORT + '/users/register', signUpData)
      .then(
        response => {
          console.log(response);
          authenticationService.login(signUpData.username, signUpData.password)
            .then(
              user => {
                history.push('/dashboard')
              }, error => {
                console.log(error);
              }
            )
        }
      );
  }

  // async function handleConfirmationSubmit(event) {
  //   event.preventDefault();
  // }


  // function renderConfirmationForm() {
  //   return (
  //     <React.Fragment>
  //       <Container component="main" maxWidth="xs">
  //         <CssBaseline />
  //         <div className={classes.paper}>
  //           <Typography component="h6" variant="h6">
  //             Verify your account
  //         </Typography>
  //           <form className={classes.form} noValidate>
  //             <Grid container spacing={2}>
  //               <Grid item xs={12}>
  //                 <TextField
  //                   name="confirmationCode"
  //                   variant="outlined"
  //                   required
  //                   fullWidth
  //                   type="tel"
  //                   id="confirmationCode"
  //                   label="Confirmation Code"
  //                   autoFocus
  //                   onChange={handleFieldChange}
  //                   value={fields.confirmationCode}
  //                 />
  //               </Grid>
  //             </Grid>
  //             <Grid container justify="flex-end">
  //               <Grid item>
  //                 Please check your email for the code
  //               </Grid>
  //             </Grid>
  //             <Button
  //               type="submit"
  //               fullWidth
  //               variant="contained"
  //               color="primary"
  //               className={classes.submit}
  //               disabled={!validateConfirmationForm()}
  //               onClick={handleConfirmationSubmit}
  //             >
  //               Verify
  //           </Button>
  //           </form>
  //         </div>
  //       </Container>
  //       <Footer />
  //     </React.Fragment>
  //   );
  // }

  function renderForm() {
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h6" variant="h6">
              Create New Account
          </Typography>
            <Form
              onSubmit={handleSubmit}
              validate={validate}
              render={({ handleSubmit, form, submitting, values }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        autoComplete="given-name"
                        name="firstName"
                        required={true}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        autoComplete="family-name"
                        name="lastName"
                        required={true}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required={true}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required={true}
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required={true}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required={true}
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={3}>
                          <FormLabel component="legend" style={{ justifyContent: 'center', marginTop: '12px' }}>User Type</FormLabel>
                        </Grid>
                        <Grid item xs={9}>
                          <Radios
                            name="userType"
                            required={true}
                            id="userType"
                            color="primary"
                            formControlProps={{ margin: 'none' }}
                            radioGroupProps={{ row: true }}
                            data={[
                              { label: 'Basic', value: 'Basic_User_Type' },
                              { label: 'Premium', value: 'Premium_User_Type' },
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container justify="center">
                      <Grid item>
                        <Link href="/dashboard" variant="caption">
                          Continue as a guest
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={submitting}
                  >
                    Register
            </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="login" variant="body2">
                        Already have an account? Sign in
                </Link>
                    </Grid>
                  </Grid>
                </form>)}
            />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  return (
    <div>
      {/* {newUser === null ? renderForm() : renderConfirmationForm()} */}
      {renderForm()}
    </div>
  );
}