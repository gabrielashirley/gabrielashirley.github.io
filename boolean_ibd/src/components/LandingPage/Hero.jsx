import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';
import heroimg from '../../assets/hero_background.webp';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    container: {
        marginTop: theme.spacing(20),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '500px'
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(#a178b5, #8cbee7)',
        opacity: 0.5,
        zIndex: -1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -5,
        backgroundImage: `url(${heroimg})`,
        backgroundPosition: 'center',
    },
    arrowDown: {
        position: 'absolute',
        bottom: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    }
}));

export default function Hero() {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    Target discovery in IBD
                </Typography>
                <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                    AI-guided discovery of a barrier protective therapy in Inflammatory Bowel Disease.
                </Typography>
                <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                    From map, to models to a first-in-class therapy to restore and protect the leaky gut barrier in IBD.
          </Typography>

                <Button
                    style={{ backgroundColor: '#6aa7d3', color: '#FFFFFF' }}
                    variant="contained"
                    size="large"
                    className={classes.button}
                    component="a"
                    href="/signup"
                >
                    REGISTER
          </Button>
                <Typography variant="body2" color="inherit" className={classes.more}>
                    Discover the experience
          </Typography>
                <div className={classes.backdrop} />
                <div className={classes.background} />
                <img
                    className={classes.arrowDown}
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4="
                    height="54"
                    width="50"
                    alt="arrow down"
                />
            </Container>
        </section>
    );
}