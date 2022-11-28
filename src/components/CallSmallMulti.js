import { useRef, useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SmallMultiples from "./SmallMultiples";
import SmallMultiples2 from "./SmallMultiples2";
import Bubble from "./BubbleChart";

function CallSmallMulti({ data , selected, selectedColors, dimension, setDimension}) {
  var svgRef = useRef(null);

  useEffect(() => {
    SmallMultiples2({ data, svgRef , selected, selectedColors, dimension}, {});
  }, [data]);



  const dimensions = [
    'Needs Only Regular Maintenance', 'Needs Minor Repairs',
       'Needs Major Repairs', 'Average Monthly Shelter Costs',
       'Total Num Private Dwellings', 'Average Household Income',
       'Population', 'Average Age', 'Average Home Valuation'
  ]
  const handleChange =(e)=> {
    setDimension(e.target.value);
  };

  return (
    <div className="container">
    <div className="header">

    <h2 className='heading'>Regional Property Values in the CRD</h2>
    <p className="text-muted">A choropleth map displaying regional property <br /> assessments across the CRD.  Data collected <br />from the CMHC surveys published over 10 years, <br />in 2006, 2011, and 2016.</p>
            
    </div>
    <div style={{height: "900px"}}>
    <svg style={{width: "100%", height:"80%"}} ref={svgRef} />
    <FormControl style={{width: "300px", "paddingLeft": "250px"}}>
          <InputLabel style={{"paddingLeft": "330px"}} id="demo-simple-select-label">Dimension</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dimension}
            label="Dimension"
            onChange={handleChange}
          >
              {
                dimensions.map((d) => {
                  return <MenuItem key={d} value={d} style={{fontSize: 14}}>{d}</MenuItem>
                })
              }
          </Select>
        </FormControl>
    </div>
    </div>

  );
}

export default CallSmallMulti;
