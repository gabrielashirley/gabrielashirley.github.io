import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function MouseModel({ geneSelected }) {
    const [mouseModel, setMouseModel] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=ibdMouse&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    setMouseModel(data.bar);
                }
            })
            .then(() => setLoading(false));
    }, [geneSelected]);

    if (loading) {
        return (
            <CircularProgress />
        )
    }
    else {
        return (
            <div>
                {mouseModel ? <img src={'data:image/jpeg;base64,' + mouseModel} alt="Mouse Model" /> : null}
            </div>
        )
    }
}
