import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    h2: {
        fontFamily: 'Open Sans',
        fontSize: 15,
        fontWeight: 500,
        cursor: 'default'
    },
    table: {
        minWidth: 500,
    },
    cell: {
        width: '30%',
        cursor: 'default'
    }
});

export default function EMTHealingIndex({ geneSelected }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [indexData, setIndexData] = useState([]);
    const [thrFloat, setThrFloat] = useState(0.0);

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=tindex&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    const geneDetails = geneSelected.map(gene => data[gene]).filter(gene => !!gene);
                    setIndexData(geneDetails.map(selected => ({ name: selected[0], therapeutic: selected[1], index: selected[2], type: selected[3] })));
                }
                setThrFloat(data['thr']);
            })
            .then(() => setLoading(false));
    }, [geneSelected]);

    if (loading) {
        return <CircularProgress />
    }

    return (
        <Table className={classes.table}>
            <TableBody>
                {indexData && indexData.map(data => (
                    <TableRow key={data.name}>
                        <TableCell className={classes.cell}><h2 className={classes.h2}>{data.name}</h2></TableCell>
                        <TableCell className={classes.cell}><FormControlLabel labelPlacement="bottom" control={
                            <Checkbox disableRipple style={{ cursor: 'default' }} color="primary" checked={(data.type === "Antagonist" && (data.index === "Both" || data.index === "EMT")) ? true : ((data.type === "Agonist" && (data.therapeutic < thrFloat)) ? true : false)} name="EMT" />
                        } label="EMT" className={classes.h2} /></TableCell>
                        <TableCell className={classes.cell}><FormControlLabel labelPlacement="bottom" control={
                            <Checkbox disableRipple style={{ cursor: 'default' }} color="primary" checked={(data.type === "Antagonist" && (data.index === "Both" || data.index === "Healing")) ? true : ((data.type === "Agonist" && (data.therapeutic < thrFloat)) ? true : false)} name="Healing" />
                        } label="Healing" className={classes.h2} /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    );
}
