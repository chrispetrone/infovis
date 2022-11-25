import { select } from 'd3';
import { geoJson } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { ButtonGroup, Button, Box } from "@mui/material";
import Legend from './Legend.js';
// import './Map.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

let data = require("./newareas.json")


const Map = () => {

    const [selected, setSelected] = useState([]);
    const [selectedButton, setSelectedButton] = useState("2006");
    console.log("selected:", selected);
    /* function determining what should happen onmouseover, this function updates our state*/
    const highlightFeature = (e => {
        var layer = e.target;
        const properties = e.target.feature.properties;
        const areaName = properties['Name_x'];
        if (selected.includes(areaName)) {
            var newArr = [...selected].filter(function (e) { return e !== areaName });
            setSelected(newArr)
            selected.splice(selected.indexOf(areaName), 1);
        } else {
            setSelected([...selected, properties['Name_x']])
            selected.push(properties['Name_x'])
        }
    })

    const mapStyle = {
        height: '80vh',
        width: '100%',
        margin: '0'
    }
    const style = (feature => {
        return ({
            fillColor: getColor(feature.properties),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
        });
    });
    function getColor(properties) {
        const areaName = properties['Name_x']
        const selectedAreas = [...selected]
        if (selectedAreas.includes(areaName)) {
            return '#000000'
        }
        const d = properties['Single-Detached']
        if (d < 400000) return '#edf8fb';
        if (d < 600000) return '#b3cde3';
        if (d < 800000) return '#8c96c6';
        if (d < 1000000) return '#8856a7';
        if (d < 1200000) return '#810f7c';
        return '#8f1f8c';
    }

    var mapData = yearFilter(data)
    function yearFilter(arr) {
        const items = arr.filter(item => item.properties.year === selectedButton);
        return items
    }
    const onEachFeature = (feature, layer) => {
        layer.on({
            click: (e) => {
                highlightFeature(e);
            },
        });
    }

    function updateYear(year) {
        setSelectedButton(year);
    }

    return (
        <div className='container'>
            <div className="header">
                <h2 className='heading'>Regional Property Values in the CRD</h2>
                <p className="text-muted">A choropleth map displaying regional property <br /> assessments across the CRD.  Data collected <br />from the CMHC surveys published over 10 years, <br />in 2006, 2011, and 2016.</p></div>
            <div className="" >
                <div className="">
                    {/* {onselect.name && (
                        <ul className="census-info">
                            <li><strong>{onselect.name}</strong></li><br />
                            <li>Value:{onselect.value}</li>
                        </ul>
                    )} */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                    >
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button color={selectedButton == "2006" ? "secondary" : "primary"} onClick={() => updateYear("2006")}>2006</Button>
                            <Button color={selectedButton == "2011" ? "secondary" : "primary"} onClick={() => updateYear("2011")}> 2011</Button>
                            <Button color={selectedButton == "2016" ? "secondary" : "primary"} onClick={() => updateYear("2016")}> 2016</Button>
                        </ButtonGroup>
                    </Box>
                    <MapContainer center={[48.47, -123.5]} attributionControl={false}
                        zoom={10} scrollWheelZoom={true} style={mapStyle}>
                        <TileLayer
                            style={{ zIndex: 1 }}
                            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                        />
                        {data && (
                            <GeoJSON key={selectedButton} data={mapData} style={style} onEachFeature={onEachFeature} />
                        )}
                        <Box>
                            <Legend key={selectedButton + "a"} data={data} style={{ zIndex: 2 }} />
                        </Box>
                    </MapContainer>
                </div>
            </div >
        </div >

    )
}
export default Map;