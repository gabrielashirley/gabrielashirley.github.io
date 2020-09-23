import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CircularProgress, Tooltip, ClickAwayListener, Button, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    text: {
        marginTop: 0,
        height: 15,
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        color: 'black',
        position: 'relative',
        fontFamily: 'Open Sans',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '2px',
    },
    intBar: {
        left: -120,
        height: 7,
        width: '130%',
        backgroundColor: '#e8e8e8',
        marginTop: 60,
        position: 'relative',
    },
    floatBar: {
        left: -120,
        height: 7,
        width: '130%',
        backgroundColor: '#e8e8e8',
        marginTop: 60,
        position: 'relative',
    },
    mark: {
        borderRadius: 0,
        width: 2,
        height: 18,
        position: 'absolute',
        top: -5
    },
    start: {
        backgroundColor: 'darkGray',
        left: 0,
        width: 5,
        zIndex: 100
    },
    end: {
        backgroundColor: 'darkGray',
        right: 0,
        width: 5,
        zIndex: 100
    },
    threshold: {
        width: 10,
        height: 10,
        position: 'absolute',
        bottom: -20,
        backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22%23ed1c24%22%20d%3D%22M4%200l4%208H0z%22%2F%3E%3C%2Fsvg%3E')`
    },
    therapeutic: {
        backgroundImage: 'linear-gradient(blue, yellow, blue)',
        width: 5,
        zIndex: 1000
    },
    h2: {
        fontFamily: 'Open Sans',
        color: 'gray',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '3px',
        margin: '50px'
    },
    root: {
        position: 'relative',
        textAlign: 'right'
    },
    dropdown: {
        position: 'absolute',
        right: 0,
        border: '1px solid darkGray',
        borderRadius: '2%',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        zIndex: 2000,
    },
    legends: {
        fontFamily: 'Open Sans',
        color: 'gray',
        fontWeight: 400,
        letterSpacing: '3px',
        marginLeft: 15,
    },
    legendsIcon: {
        width: 20,
        height: 20
    }
}));

export default function TherapeuticIndex({ geneSelected }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [therapeuticData, setTherapeuticData] = useState({});
    const [fda, setFda] = useState([]);
    const [maxInt, setMaxInt] = useState(0);
    const [thrInt, setThrInt] = useState(0);
    const [minFloat, setMinFloat] = useState(0.0);
    const [maxFloat, setMaxFloat] = useState(0.0);
    const [thrFloat, setThrFloat] = useState(0.0);
    const [selectedMarkInt, setSelectedMarkInt] = useState({ name: '', index: -1 });
    const [selectedMarkFloat, setSelectedMarkFloat] = useState({ name: '', index: 0.0 });
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };


    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=tindex&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    const geneDetails = geneSelected.map(gene => data[gene]).filter(gene => !!gene);
                    const maxValue = geneDetails.map(details => details[5]).reduce((x, y) => Math.max(x, y));
                    const bestGene = geneDetails.find(details => details[5] === maxValue);
                    setTherapeuticData({ name: bestGene[0], floatIndex: Number(bestGene[1]), intIndex: bestGene[5] });
                }

                setFda(data['FDA Approved'].map(fdaData => ({ name: fdaData[0], floatIndex: Number(fdaData[1]), intIndex: fdaData[5], approved: fdaData[6], path: fdaData[2] })));
                setMaxInt(data['Total Num']);
                setThrInt(data['thrNum']);
                setMinFloat(data['Minimum']);
                setMaxFloat(data['Maximum']);
                setThrFloat(data['thr']);
            })
            .then(() => setLoading(false));
    }, [geneSelected]);

    const onHoverInt = (event, name, index) => {
        event.target.style.opacity = 0.5;
        setSelectedMarkInt({ name, index });
    }

    const onMouseLeaveInt = event => {
        event.target.style.opacity = 1.0;
        setSelectedMarkInt({ name: '', index: -1 });
    }

    const onHoverFloat = (event, name, index) => {
        event.target.style.opacity = 0.5;
        setSelectedMarkFloat({ name, index });
    }

    const onMouseLeaveFloat = event => {
        event.target.style.opacity = 1.0;
        setSelectedMarkFloat({ name: '', index: 0.0 });
    }

    const buildIntText = () => {
        const { name, index } = selectedMarkInt;
        return (
            <div className={classes.text}>
                {!!name && index !== -1 && `${name} - ${index}`}
            </div>
        )
    }

    const buildFloatText = () => {
        const { name, index } = selectedMarkFloat;
        return (
            <div className={classes.text}>
                {!!name && !!index && `${name} : ${index}`}
            </div>
        )
    }

    const buildIntBar = () => {
        const { name, intIndex } = therapeuticData

        return (
            <div className={classes.intBar}>
                <Tooltip title="Threshold: 8998">
                    <div className={classes.threshold} style={{ right: `${thrInt / maxInt * 100}%` }} />
                </Tooltip>
                <div
                    className={classNames(classes.mark, classes.start)}
                    onMouseOver={event => onHoverInt(event, 'Maximum', maxInt)}
                    onMouseLeave={onMouseLeaveInt}
                />
                <div
                    className={classNames(classes.mark, classes.end)}
                    onMouseOver={event => onHoverInt(event, 'Minimum', 0)}
                    onMouseLeave={onMouseLeaveInt}
                />
                {fda.map(data => ((data.intIndex < thrInt && data.path !== "Both") ? null :
                    <div
                        key={data.name}
                        className={classes.mark}
                        style={{
                            right: `${data.intIndex / maxInt * 100}%`,
                            backgroundColor: data.approved === "0" ? 'salmon' : 'darkSeaGreen'
                        }}
                        onMouseOver={event => onHoverInt(event, data.name, data.intIndex)}
                        onMouseLeave={onMouseLeaveInt}
                    />
                ))}
                {!!name && intIndex >= 0 && intIndex <= maxInt &&
                    <div
                        className={classNames(classes.mark, classes.therapeutic)}
                        style={{ right: intIndex === 0 ? 0 : `${intIndex / maxInt * 100}%` }}
                        onMouseOver={event => onHoverInt(event, name, intIndex)}
                        onMouseLeave={onMouseLeaveInt}
                    />
                }
            </div>
        );
    }

    const buildFloatBar = () => {
        const { name, floatIndex } = therapeuticData
        const range = maxFloat - minFloat
        const rangeThr = thrFloat - minFloat

        return (
            <div className={classes.floatBar}>
                <Tooltip title="Threshold: 0.1">
                    <div className={classes.threshold} style={{ right: `${rangeThr / range * 100}%` }} />
                </Tooltip>
                <div
                    className={classNames(classes.mark, classes.start)}
                    onMouseOver={event => onHoverFloat(event, 'Maximum', maxFloat)}
                    onMouseLeave={onMouseLeaveFloat}
                />
                <div
                    className={classNames(classes.mark, classes.end)}
                    onMouseOver={event => onHoverFloat(event, 'Minimum', minFloat)}
                    onMouseLeave={onMouseLeaveFloat}
                />
                {fda.map(data => ((data.floatIndex < thrFloat && data.path !== "Both") ? null :
                    <div
                        key={data.name}
                        className={classes.mark}
                        style={{
                            right: `${(data.floatIndex - minFloat) / range * 100}%`,
                            backgroundColor: data.approved === "0" ? 'salmon' : 'darkSeaGreen'
                        }}
                        onMouseOver={event => onHoverFloat(event, data.name, data.floatIndex)}
                        onMouseLeave={onMouseLeaveFloat}
                    />
                ))}
                {!!name && !!floatIndex &&
                    <div
                        className={classNames(classes.mark, classes.therapeutic)}
                        style={{ right: `${(floatIndex - minFloat) / range * 100}%` }}
                        onMouseOver={event => onHoverFloat(event, name, floatIndex)}
                        onMouseLeave={onMouseLeaveFloat}
                    />
                }
            </div>
        );
    }

    if (loading) {
        return <CircularProgress style={{ marginLeft: '50%' }}/>
    }

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <Button color="primary" onClick={handleClick}>
                        View Legends
                    </Button>
                    {open ? (
                        <List className={classes.dropdown}>
                            <ListItem>
                                <img alt="Threshold" className={classes.legendsIcon} src={'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22%23ed1c24%22%20d%3D%22M4%200l4%208H0z%22%2F%3E%3C%2Fsvg%3E'} />
                                <ListItemText primary="Threshold" className={classes.legends} />
                            </ListItem>
                            <ListItem>
                                <img alt="FDA Approved" className={classes.legendsIcon} src={require('../../assets/FDAApproved.png')} />
                                <ListItemText primary="FDA Approved" className={classes.legends} />
                            </ListItem>
                            <ListItem>
                                <img alt="FDA Not Approved" className={classes.legendsIcon} src={require('../../assets/FDANotApproved.png')} />
                                <ListItemText primary="FDA Not Approved" className={classes.legends} />
                            </ListItem>
                            <ListItem>
                                <img alt="Gene Target" className={classes.legendsIcon} src={require('../../assets/GeneTarget.png')} />
                                <ListItemText primary="Gene Target" className={classes.legends} />
                            </ListItem>
                        </List>
                    ) : null}
                </div>
            </ClickAwayListener>
            <h2 className={classes.h2}>Therapeutic Index Bar 1</h2>
            {buildIntText()}
            {buildIntBar()}

            <h2 className={classes.h2}>Therapeutic Index Bar 2</h2>
            {buildFloatText()}
            {buildFloatBar()}
        </Fragment>
    );
}
