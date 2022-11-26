import React from 'react';
import { useState } from 'react';
import './App.css';
import Map from './components/Map';
import { Grid } from '@mui/material';
import data from "./data.json"
import Legend from './components/Legend';
import SmallMultiples from './components/SmallMultiples';
import CallSmallMulti from './components/CallSmallMulti';

const App = () => {
  const [selected, setSelected] = useState([]);
  const [selectedButton, setSelectedButton] = useState("2006");


  return (
    <div className='container'>
      <Grid container spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end">
        <Grid item xs={5}>
          <Map selected = {selected} setSelected={setSelected} selectedButton={selectedButton} setSelectedButton = {setSelectedButton}/>
        </Grid>
        <Grid item xs={7}>
          <CallSmallMulti data = {data}/>
        </Grid>
      </Grid>
    </div>
  );
};
export default App;