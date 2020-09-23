import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function IBDGender({ geneSelected }) {
    const [ibdGender, setIbdGender] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const geneQuery = geneSelected.join('%20');

        axios
            .get(
                `http://hegemon.ucsd.edu/microarray/Data2/Pradipta/ibd-map/analyze.php?go=ibdGender&id=${geneQuery}&type=json`
            )
            .then(({ data }) => {
                if (geneSelected.length > 0) {
                    setIbdGender(data.bar);
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
            <div style={{ overflowX: 'scroll' }}>
                {ibdGender ? <img src={'data:image/jpeg;base64,' + ibdGender} alt="IBD Gender" width="100%" height="150%" /> : null}
            </div>
        )
    }
}
