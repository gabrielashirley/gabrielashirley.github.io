import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.common.black,
        overflow: 'hidden',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    text: {
        fontSize: 18,
        color: theme.palette.common.white,
    },
    image: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderRadius: '50%',
        width: '150px',
        height: '150px',
        zIndex: '1'
    },
    curvyLines: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        left: 80,
        opacity: 0.7,
    },
    button: {
        marginTop: theme.spacing(8),
    },
    caption: {
        fontSize: 10,
        color: theme.palette.common.white,
    },
    title: {
        fontSize: 40,
        marginBottom: theme.spacing(4),
        fontWeight: 350,
        letterSpacing: 2,
        lineHeight: 3,
        color: theme.palette.common.white,
    },
});

function Team(props) {
    const { classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.title}>
            OUR TEAM
            </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    className={classes.image}
                                    src={require("../../assets/debashis-sahoo.jpg")}
                                    alt="sahoo"
                                />
                                <Typography component="body1" className={classes.text}>
                                    Debashis Sahoo
                                </Typography>
                                <Typography component="caption" className={classes.caption}>
                                    Assistant Professor
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    className={classes.image}
                                    src={require("../../assets/gabriela-shirley.jpg")}
                                    alt="shirley"
                                />
                                <Typography variant="body1" className={classes.text}>
                                    Gabriela Shirley
                                </Typography>
                                <Typography variant="caption" className={classes.caption}>
                                    UCSD Computer Science '21
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    className={classes.image}
                                    src={require("../../assets/anh-pahm.jpg")}
                                    alt="pahm"
                                />
                                <Typography variant="body1" className={classes.text}>
                                    Anh Pham
                                </Typography>
                                <Typography variant="caption" className={classes.caption}>
                                    UCSD Computer Science '21
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    className={classes.image}
                                    src={require("../../assets/angela-wang.jpg")}
                                    alt="wang"
                                />
                                <Typography variant="body1" className={classes.text}>
                                    Angela Wang
                                </Typography>
                                <Typography variant="caption" className={classes.caption}>
                                    {'UCSD Math-CS \'21'}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}

Team.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Team);