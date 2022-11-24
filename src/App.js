import React from 'react';
import './App.css';
import Map from './components/Map';
import Legend from './components/Legend';
import { Grid } from '@mui/material';

const App = () => {  

  return (
    <div className='container'>
      <Grid container spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start">
        <Grid item xs={6}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
};
export default App;