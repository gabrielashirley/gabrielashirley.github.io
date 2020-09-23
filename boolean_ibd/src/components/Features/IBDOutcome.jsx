import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        maxHeight: 500,
        marginLeft: '4px',
        marginRight: '4px'
    },
});

export default function IBDOutcome({ geneSelected }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    const [ibdOutcome, setIbdOutcome] = useState(null);

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=ibdOutcome&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    setIbdOutcome(data);

                }
            })
            .then(() => setLoading(false));
    }, [geneSelected]);

    function createData(title, dbid, fisher, rocauc, roc, accuracy, key, source, bar) {
        return { title, dbid, fisher, rocauc, roc, accuracy, key, source, bar };
    }

    const rows = ibdOutcome && [
        createData(ibdOutcome.title[0], ibdOutcome.dbid[0], ibdOutcome.fisher[0], ibdOutcome["roc-auc"][0], ibdOutcome["roc"][0], ibdOutcome.accuracy[0], ibdOutcome.key[0], ibdOutcome.source[0], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[0]} alt="" />),
        createData(ibdOutcome.title[1], ibdOutcome.dbid[1], ibdOutcome.fisher[1], ibdOutcome["roc-auc"][1], ibdOutcome["roc"][1], ibdOutcome.accuracy[1], ibdOutcome.key[1], ibdOutcome.source[1], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[1]} alt="" />),
        createData(ibdOutcome.title[2], ibdOutcome.dbid[2], ibdOutcome.fisher[2], ibdOutcome["roc-auc"][2], ibdOutcome["roc"][2], ibdOutcome.accuracy[2], ibdOutcome.key[2], ibdOutcome.source[2], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[2]} alt="" />),
        createData(ibdOutcome.title[3], ibdOutcome.dbid[3], ibdOutcome.fisher[3], ibdOutcome["roc-auc"][3], ibdOutcome["roc"][3], ibdOutcome.accuracy[3], ibdOutcome.key[3], ibdOutcome.source[3], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[3]} alt="" />),
        createData(ibdOutcome.title[4], ibdOutcome.dbid[4], ibdOutcome.fisher[4], ibdOutcome["roc-auc"][4], ibdOutcome["roc"][4], ibdOutcome.accuracy[4], ibdOutcome.key[4], ibdOutcome.source[4], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[4]} alt="" />),
        createData(ibdOutcome.title[5], ibdOutcome.dbid[5], ibdOutcome.fisher[5], ibdOutcome["roc-auc"][5], ibdOutcome["roc"][5], ibdOutcome.accuracy[5], ibdOutcome.key[5], ibdOutcome.source[5], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[5]} alt="" />),
        createData(ibdOutcome.title[5], ibdOutcome.dbid[5], ibdOutcome.fisher[6], ibdOutcome["roc-auc"][6], ibdOutcome["roc"][6], ibdOutcome.accuracy[6], ibdOutcome.key[6], ibdOutcome.source[6], <img src={'data:image/jpeg;base64,' + ibdOutcome.bar[6]} alt="" />),
    ];

    if (loading) {
        return (
            <CircularProgress />
        )
    }
    return (
        <React.Fragment>
            {ibdOutcome && (
                <TableContainer component={Paper} className={classes.container}>
                    <Table stickyHeader className={classes.table} aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell style={{ padding: '11px' }} align="center">Title</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">DBID</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">Fisher</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">ROC-AUC</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">ROC</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">Accuracy</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">Key</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">Source</TableCell>
                                <TableCell style={{ padding: '11px' }} align="center">Bar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.title}>
                                    <TableCell style={{ padding: '11px' }} component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.dbid}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.fisher}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.rocauc}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.roc}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.accuracy}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.key}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.source}</TableCell>
                                    <TableCell style={{ padding: '11px' }}>{row.bar}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </React.Fragment>
    )
}