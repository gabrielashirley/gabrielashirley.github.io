import React, { useState, useEffect } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress} from '@material-ui/core';

export default function CDMap({ geneSelected }) {
    const [cdMapCluster, setCdMapCluster] = useState(null);
    const [loading, setLoading] = useState(true);

    function createData(gene, clusterNumber) {
        return { gene, clusterNumber };
    }

    const rows = cdMapCluster && Object.keys(cdMapCluster).map(key => createData(key, cdMapCluster[key]));

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=cd-map&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    setCdMapCluster(data);
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
            {rows && (
                    <SvgLoader path={require("../../assets/cd-network.svg")} style={{ width: '100%', maxHeight: '500px' }}>
                        <SvgProxy selector=".st16" stroke="purple" />
                        {
                            rows.map(row => 
                                row.clusterNumber.split(',').map((cluster, index) =>
                                <SvgProxy selector={`.cluster${cluster}`} key={`${cluster}-${index}`} stroke="yellow" />
                            ))
                        }
                    </SvgLoader>
                )}
            {rows && (
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="center">Gene Name</TableCell>
                                <TableCell align="center">Cluster Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map(row => (
                                    <TableRow key={row.gene}>
                                        <TableCell align="center" component="th" scope="row">{row.gene}</TableCell>
                                        <TableCell align="center">{row.clusterNumber}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </React.Fragment>
    )
}
