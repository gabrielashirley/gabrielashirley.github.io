import React from 'react';
import { List, ListSubheader, ListItem, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    color: '#545454',
    textTransform: 'none',
    justifyContent: 'flex-start',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
    '&:focus': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: 'rgba(107, 169, 235, 0.41)'
    },
    paddingLeft: '15px'
  },
  item: {
    display: 'flex',
  },
  premium: {
    padding: 0,
    margin: 0,
    textAlign: 'center'
  }
}));

export default function SidebarNav({ onClick }) {
  const classes = useStyles();
  return (
    <div>
      <Divider />
      <List>
        <ListItem disableGutters className={classes.item} >
          <Button onClick={() => onClick("1")} className={classes.button}>{'Therapeutic Index'}</Button>
        </ListItem>
        <Divider />
        <ListSubheader inset className={classes.premium}>Premium</ListSubheader>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("2")} className={classes.button}>{'IBD Map'}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("3")} className={classes.button}>{'UC Map'}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("4")} className={classes.button}>{'CD Map'}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("5")} className={classes.button}>{"Healing & EMT Index"}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("6")} className={classes.button}>{'IBD Outcome'}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("7")} className={classes.button}>{'Colon Tissue'}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("8")} className={classes.button}>{'Gender Bias'}</Button>
        </ListItem>
        <ListItem disableGutters className={classes.item}>
          <Button onClick={() => onClick("9")} className={classes.button}>{'Mouse Model'}</Button>
        </ListItem>
      </List>
    </div>
  );
} 