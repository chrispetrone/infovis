import React from 'react';
import { useState, useRef } from 'react';
import './App.css';
import Map from './components/Map';
import {Grid} from "@mui/material";
import data from "./final2.json"
import CallSmallMulti from './components/CallSmallMulti';
import {ButtonGroup, Button} from '@mui/material';

const App = () => {
  const [selected, setSelected] = useState([]);
  const [selectedButton, setSelectedButton] = useState("2006");
  const [selectedColors, setSelectedColors] = useState({});
  const [dimension, setDimension] = useState("Average Home Valuation");


  return (
    <div className='container'>
      <Grid container spacing={2}
        direction="row"
        justifyContent="flex-start">
        <Grid style={{paddingLeft: "50px"}}  item xs={5}
        alignItems="flex-end">
          <Map selected = {selected} setSelected={setSelected} 
          selectedButton={selectedButton} setSelectedButton = {setSelectedButton}
          selectedColors = {selectedColors} setSelectedColors = {setSelectedColors}
          />
        </Grid>
        <Grid item xs={7} >
          <CallSmallMulti 
          key = {[...selected, dimension]} selected={selected} 
          data = {data} selectedColors = {selectedColors} dimension={dimension} setDimension={setDimension}/>
      </Grid>
        </Grid>

    </div>
  );
};
export default App;