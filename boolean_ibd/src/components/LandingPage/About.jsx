import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, Card, CardHeader, CardContent, Grid, Zoom } from '@material-ui/core';

const styles = (theme) => ({
    container: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginLeft: 50
    },
    card: {
        width: 310,
        height: 540,
        margin: "auto",
        position: "relative",
        borderRadius: 50,
        zIndex: 1,
    },
    cardMedia: {
        height: "100%",
        opacity: '90%'
    },
    cardHeader: {
        marginTop: 30,
        height: 40,
        textAlign: "center",
        lineHeight: 1.5,
        letterSpacing: 2,
    },
    cardContent: {
        lineHeight: 1.8,
        letterSpacing: 0.5,
        position: "absolute",
        padding: theme.spacing.unit * 3,
        textAlign: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 40,
        marginBottom: theme.spacing(2),
        fontWeight: 350,
        letterSpacing: 2,
        lineHeight: 3
    },
});

function About(props) {
    const { classes } = props;

    return (
        <Container className={classes.container} id="about">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.title}>
                OUR RESEARCH
            </Typography>
            <Grid container spacing={10}>
                <Grid item xs={12} md={6} lg={3}>
                    <Zoom in={true} timeout={300}>
                        <Card className={classes.card} raised={true}>
                            <CardHeader title="BACKGROUND" className={classes.cardHeader} />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="caption" color="inherit">
                                    Drug development has become an economically unsustainable process due to low reproducibility, high attrition rates, failures in Phase III trials, and increasing R&D costs. These trends have necessitated the modeling of human diseases as networks to simplify complex multi-cellular processes, understand patterns in noisy data that humans cannot find, and thereby, achieve precision.
                                </Typography>
                            </CardContent>

                        </Card>
                    </Zoom>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Zoom in={true} timeout={500}>
                        <Card className={classes.card} raised={true}>
                            <CardHeader title="METHOD" className={classes.cardHeader} />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="caption" color="inherit">
                                    Using Inflammatory Bowel Disease (IBD) as an example, here we outline an AI-assisted approach for target identification and validation. We built a network in which clusters of genes are connected by directed edges that highlight asymmetric Boolean relationships. Algorithms of machine learning were used to sift through the network to pinpoint the path of continuum states that most reliably distinguished between health and disease states, disease severity, and predicted treatment outcome.
                                </Typography>
                            </CardContent>

                        </Card>
                    </Zoom>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Zoom in={true} timeout={700}>
                        <Card className={classes.card} raised={true}>
                            <CardHeader title="RESULT" className={classes.cardHeader} />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="caption" color="inherit">
                                    Our network-based computational models reliably classified healthy and IBD-afflicted tissues in several publicly available gene expression datasets (906 human samples, 234 mouse samples). The AI-identified path was enriched in gene clusters that maintain the integrity of the gut epithelial barrier. We exploit the gene clusters on that path for prioritizing one target, choosing appropriate pre-clinical murine models for target validation and for designing patient-derived organoid models. Treatment efficacy is confirmed in these patient-models using a multivariate analysis. This AI-assisted approach also predicts Phase III success in IBD with higher accuracy over traditional approaches.
                                </Typography>
                            </CardContent>

                        </Card>
                    </Zoom>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Zoom in={true} timeout={900}>
                        <Card className={classes.card} raised={true}>
                            <CardHeader title="CONCLUSION" className={classes.cardHeader} />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="caption" color="inherit">
                                    The combined synergy of AI-assisted target identification and the choice of preclinical mouse and human models for target validation has provided a first-in-class gut barrier-protective agent in IBD.
                                </Typography>
                            </CardContent>

                        </Card>
                    </Zoom>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withStyles(styles)(About);