import React from 'react';
import './App.css';
import Map from './components/Map';
import { Grid } from '@mui/material';

import Legend from './components/Legend';

const App = () => {

  return (
    <div className='container'>
      <Grid container spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end">
        <Grid item xs={5}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
};
export default App;