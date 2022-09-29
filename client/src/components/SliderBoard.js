import React, {useState, useEffect} from 'react';
import {Grid, Typography, Slider, Checkbox} from '@material-ui/core';

// initial states
const sliders = {
  'acousticness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'danceability': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'energy': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'instrumentalness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'liveness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'loudness': {
    value: [-60, 0],
    enabled: false,
    min: -60,
    max: 0
  },
  'popularity': {
    value: [0, 100],
    enabled: false,
    min: 0,
    max: 100,
    step: 1,
  },
  'speechiness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'tempo': {
    value: [0, 200],
    enabled: false,
    min: 0,
    max: 200,
    step: 1,
  },
  'valence': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
};

const SliderBoard = ({onChange}) => {
    const [boardValues, setBoardValues] = useState(sliders);
  
    const handleChange = (slider, value) => {
      const newBoardValues = {...boardValues};
      newBoardValues[slider].value = value;
      setBoardValues(newBoardValues);
    };
  
    const toggleSlider = (slider, value) => {
      const newBoardValues = {...boardValues};
      newBoardValues[slider].enabled = value;
      setBoardValues(newBoardValues);
    };
  
    useEffect(() => {
      onChange(boardValues);
    }, [onChange, boardValues]);
  
    return (
     <Grid container spacing={2} style={{padding: 10}}>
       {Object.keys(sliders).map(slider => (
         <Grid item xs={12}>
           <div style={{display: 'flex', flexDirection: 'row'}}>
             <Checkbox
               checked={boardValues[slider].enabled}
               onChange={(event, newValue) => toggleSlider(slider, newValue)}
             />
             <div style={{flex: 1}}>
               <Typography>
                 {slider}
               </Typography>
               <Grid container spacing={1}>
                 <Grid item>
                   <Typography>
                     Min
                   </Typography>
                 </Grid>
                 <Grid item xs>
                   <Slider
                     disabled={!boardValues[slider].enabled}
                     value={boardValues[slider].value}
                     onChange={(event, newValue) => handleChange(slider, newValue)}
                     valueLabelDisplay={"on"}
                     aria-labelledby={"range-slider"}
                     min={sliders[slider].min}
                     max={sliders[slider].max}
                     step={sliders[slider].step}
                   />
                 </Grid>
                 <Grid item>
                   <Typography>
                     Max
                   </Typography>
                 </Grid>
               </Grid>
             </div>
           </div>
         </Grid>
       ))}
     </Grid>
    );
  };
  
  export default SliderBoard