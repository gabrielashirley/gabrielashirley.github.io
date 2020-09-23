import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '60%',
        marginTop: 30,
        marginBottom: 25,
        margin: '0 auto',
        alignItems: 'center',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

export default function GeneSearch({ geneSelected, setGeneSelected }) {
    const [geneList, setGeneList] = useState([]);

    const classes = useStyles();

    const filterOptions = createFilterOptions({
        limit: 100,
    });

    useEffect(() => {
        axios
            .get(
                "http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=listgenes"
            )
            .then(({ data }) => {
                setGeneList(data);
            });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Autocomplete
                            filterOptions={filterOptions}
                            multiple
                            id="tags-outlined"
                            options={geneList.map(option => option)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => {
                                    return <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                })
                            }
                            onChange={(event, value) => {
                                setGeneSelected(value)
                            }
                            }
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Search available genes"
                                    placeholder="Example: SLC35D1"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>

    );
}