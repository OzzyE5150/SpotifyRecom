import React, { useState } from 'react';
import './App.css';
import { Grid, TextField, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const SpotifyRecommender = ({ auth }) => {
    const { token } = auth;
    const [searchResults, setSearchResults] = useState([]);
    const [searchString, setSearchString] = useState('');
    return (
        <div className={"App"}>
            <Grid container style={{ padding: 20 }} spacing={1}>
                <Grid item xs={12}>
                    Spotify Recommender
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            variant={'outlined'}
                            label={"Search"}
                            style={{ backgroundColor: 'white' }}
                            fullWidth
                            onChange={event => setSearchString(event.target.value)}
                            value={searchString}
                        />
                        <Button style={{ backgroundColor: '#ff905b' }}>
                            <Search />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    );
};
export default SpotifyRecommender;