import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    top: 0,
    position: 'fixed',
    boxShadow: 'none',
    padding: '4px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

export default function HeaderDashboard(props) {
  const classes = useStyles();
  const { className, onSidebarOpen, ...rest } = props;

  return (
    <Fragment>
      <CssBaseline />
      <AppBar {...rest} position="static" color="default" className={clsx(classes.root, className)}>
        <Toolbar>
          <Link to="/">
            <img
              alt="Logo"
              src={require("../../../assets/boolean-logo.png")}
              width="80px"
              height="60px"
            />
          </Link>
          <div className={classes.flexGrow} />
            <IconButton
              className={classes.signOutButton}
              color="inherit"
              onClick={props.logout}
            >
              <InputIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}