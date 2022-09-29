import React, { useState } from 'react';
import './App.css';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import axios from 'axios';
import SearchResults from './components/SearchResults';
import SliderBoard from './components/SliderBoard';
import ResultsList from './components/ResultsList';

const SpotifyRecommender = ({ auth }) => {
    const { token } = auth;
    const [searchResults, setSearchResults] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [sliderValues, setSliderValues] = useState({});
    const [results, setResults] = useState(null);

    const searchSpotify = async () => {
        const url = 'https://api.spotify.com/v1/search';
        const searchQuery = encodeURIComponent(searchString);
        const typeQuery = `type=artist`;
        const {data} = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(data);
        if (data && data.artists) {
          setSearchResults(data.artists.items);
        }
      }
      
      const getRecommendations = async () => {
        const url = 'https://api.spotify.com/v1/recommendations';
      
        // get artists
        let selectedArtistsString;
        if (selectedArtists.length < 0) {
          return;
        } else {
          selectedArtistsString = `seed_artists=${selectedArtists.join(',')}`;
        }
      
        // getsliders
        let min = [];
        let max = [];
        Object.keys(sliderValues).forEach(slider => {
          if (sliderValues[slider].enabled) {
            // then we add our min and max values
            min.push(`min_${slider}=${sliderValues[slider].value[0]}`);
            max.push(`max_${slider}=${sliderValues[slider].value[1]}`);
          }
        });
        const minString = min.join('&');
        const maxString = max.join('&');
      
      
        const {data} = await axios.get(`${url}?${selectedArtistsString}&${minString}&${maxString}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(data);
        setResults(data);
      };

    return (
        <div className={"App"}>
            <Grid container style={{ padding: 20 }} spacing={1}>
                <Grid item xs={12}>
                    Spotify Recommender
                </Grid>
                <Grid item xs={6}>
                <Grid item xs={12}>
              {selectedArtists.map((artist, index) => (
                <Typography>
                  {index+1}. {artist}
                </Typography>
              ))}
            </Grid>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            variant={'outlined'}
                            label={"Search"}
                            style={{ backgroundColor: 'white' }}
                            fullWidth
                            onChange={event => setSearchString(event.target.value)}
                            value={searchString}
                        />
                        <Button style={{ backgroundColor: '#ff905b' }} onClick={searchSpotify}>
                            <Search />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                <SearchResults onChange={setSelectedArtists} results={searchResults}/>
                </Grid>
            </Grid>
            <Grid item xs={6}>
            <SliderBoard onChange={setSliderValues}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant={'contained'} onClick={getRecommendations}>
            Get Recommendations
          </Button>
        </Grid>
          <Grid item xs={12}>
            {results && <ResultsList results={results}/> }
          </Grid>
        </div>
    );
};
export default SpotifyRecommender;