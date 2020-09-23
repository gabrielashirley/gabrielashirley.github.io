import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, ButtonBase } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    // zIndex: 1000,
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  title: {
    fontSize: 40,
    marginBottom: theme.spacing(4),
    fontWeight: 350,
    letterSpacing: 2,
    lineHeight: 3
},
});

function Features(props) {
  const { classes } = props;

  const images = [

    {
      url: require('../../assets/emthealing.png'),
      title: 'EMT & Healing Index',
      width: '20%',
    },
    {
      url: require('../../assets/ibd-network.svg'),
      title: 'IBD Map',
      width: '40%',
    },
    {
      url: require('../../assets/uc-network.svg'),
      title: 'UC Map',
      width: '40%',
    },
    {
      url: require('../../assets/cd-network.svg'),
      title: 'CD Map',
      width: '38%',
    },

    {
      url: require('../../assets/ti.png'),
      title: 'Therapeutic Index',
      width: '38%',
    },
    {
      url: require('../../assets/ibdoutcome.png'),
      title: 'IBD Outcome',
      width: '24%',
    },
    {
      url: require('../../assets/colon-tissue.svg'),
      title: 'Colon Tissue',
      width: '40%',
    },
    {
      url: require('../../assets/genderbias.png'),
      title: 'Gender Bias',
      width: '20%',
    },
    {
      url: require('../../assets/mousemodel.png'),
      title: 'Mouse Model',
      width: '40%',
    },
  ];

  return (
    <Container id="features" className={classes.root} component="section">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.title}>
            OUR FEATURES
            </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

Features.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Features);