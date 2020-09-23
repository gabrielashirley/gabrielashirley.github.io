import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Hidden, Button, Menu, MenuItem, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import InfoIcon from '@material-ui/icons/Info';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    boxShadow: 'none',
    padding: '4px',
    top: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  button: {
    margin: '6px'
  },
  img: {
    marginRight: '15px',
    width: "80px",
    height: "60px"
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  }
}));

export default function HeaderLanding(props) {
  const classes = useStyles();
  const { className, onSidebarOpen, ...rest } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar {...rest} position="static" color="default" className={clsx(classes.root, className)}>
        <Toolbar>
          <Link to="/">
            <img
              alt="Logo"
              src={require("../../assets/boolean-logo.png")}
              className={classes.img}
            />
          </Link>
          <Hidden xsDown>
            <Button color="default" className={classes.button} href="/#about">{'About'}</Button>
            <Button color="default" className={classes.button} href="/#features">{'Features'}</Button>
            <Button color="default" className={classes.button} href="/#pricing">{'Pricing'}</Button>
            <div className={classes.flexGrow} />
            <Button color="default" className={classes.button} href="/login">{'Log in'}</Button>
            <Button color="primary" className={classes.button} href="/signup">{'Sign Up'}</Button>
          </Hidden>
          <Hidden smUp>
            <div className={classes.flexGrow} />
            <IconButton
              color="inherit"
              onClick={handleClick}
              edge="end"
              style={{ border: '1px solid #d3d4d5' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItem button component={"a"} href="/#about">
                  <ListItemText primary="About" />
                </ListItem>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <AppsIcon fontSize="small" />
                </ListItemIcon>
                <ListItem button component={"a"} href="/#features">
                  <ListItemText primary="Features" />
                </ListItem>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <MonetizationOnIcon fontSize="small" />
                </ListItemIcon>
                <ListItem button component={"a"} href="/#pricing">
                  <ListItemText primary="Pricing" />
                </ListItem>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItem button component={Link} to="/login">
                  <ListItemText disableTypography primary={<Typography style={{ fontWeight: 600, textAlign: 'center' }}>Log In</Typography>} />
                </ListItem>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <ListItem button component={Link} to="/signup">
                  <ListItemText disableTypography primary={<Typography style={{ fontWeight: 700, textAlign: 'center' }}>Sign Up</Typography>} />
                </ListItem>
              </MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}