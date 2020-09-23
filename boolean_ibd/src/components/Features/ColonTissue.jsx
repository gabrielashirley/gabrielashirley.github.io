import React, { useState, useEffect } from 'react';
import { SvgLoader } from 'react-svgmt';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Grid } from '@material-ui/core';

export default function ColonTissue({ geneSelected }) {
    const [colonTissueLocation, setColonTissueLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    function createData(gene, location) {
        return { gene, location };
    }

    const rows = colonTissueLocation &&
        Object.keys(colonTissueLocation).map(geneKey =>
            createData(geneKey, Object.keys(colonTissueLocation[geneKey]).map(geneLoc => colonTissueLocation[geneKey][geneLoc] === 1 ? geneLoc + (' ') : null)));

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=colon-tissue&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    setColonTissueLocation(data);
                }
            })
            .then(() => setLoading(false));

    }, [geneSelected]);

    if (loading) {
        return (
            <CircularProgress style={{ marginLeft: '50%' }}/>
        )
    }
    return (
        <React.Fragment>
            {rows &&
                <Grid container>
                    <Grid item sm={5} style={{ margin: '3px' }}>
                        <SvgLoader path={require("../../assets/colon-tissue.svg")} style={{ width: '100%', height: '135%' }} />
                    </Grid>
                    <Grid item sm={6} style={{ margin: '3px' }}>
                        <TableContainer component={Paper} style={{ width: '100%' }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="center">Gene Name</TableCell>
                                        <TableCell align="center">Location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rows.map(row => (
                                            <TableRow key={row.gene}>
                                                <TableCell align="center" component="th" scope="row">{row.gene}</TableCell>
                                                <TableCell align="center">{row.location}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>}
        </React.Fragment >
    )
}
