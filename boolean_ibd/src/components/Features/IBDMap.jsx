import React, { useState, useEffect } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress} from '@material-ui/core';

export default function IBDMap({ geneSelected }) {
    const [ibdMapCluster, setIbdMapCluster] = useState(null);
    const [loading, setLoading] = useState(true);

    function createData(gene, clusterNumber) {
        return { gene, clusterNumber };
    }

    const rows = ibdMapCluster && ibdMapCluster.map(gene => createData(gene[0], gene[4]));

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=tindex&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    const geneDetails = geneSelected.map(gene => data[gene]).filter(gene => !!gene);
                    setIbdMapCluster(geneDetails);
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
            {ibdMapCluster && (
                <SvgLoader path={require("../../assets/ibd-network.svg")} style={{ width: '100%' }}>
                    <SvgProxy selector=".st5" stroke="purple" />
                    {
                        ibdMapCluster && ibdMapCluster.map(gene => gene[4].split(',').map((clusterNumber, index) =>
                            <SvgProxy selector={`.cluster${clusterNumber}`} key={`${clusterNumber}-${index}`} stroke="yellow" />
                        ))
                    }
                </SvgLoader>
            )}
            {ibdMapCluster && (
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="center">Gene Name</TableCell>
                                <TableCell align="center">Cluster Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.gene}>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.gene}
                                    </TableCell>
                                    <TableCell align="center">{row.clusterNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </React.Fragment>
    )
}