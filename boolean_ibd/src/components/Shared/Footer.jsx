import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Boolean Lab
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 10,
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        zIndex: 10000,
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        textAlign: 'center',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
            <CssBaseline />
                <Container maxWidth="sm">
                    <Typography variant="body1">Boolean Lab</Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}