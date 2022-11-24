import { select } from 'd3';
import { geoJson } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { ButtonGroup, Button, Box } from "@mui/material";

// import './Map.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

let data = require("./newareas.json")


const Map = () => {

    var selected = []

    const [onSelect, setOnSelect] = useState({});
    const [selectedButton, setSelectedButton] = useState("2006");
    /* function determining what should happen onmouseover, this function updates our state*/
    const highlightFeature = (e => {
        var layer = e.target;
        const properties = e.target.feature.properties;
        const areaName = properties['Name_x'];
        if (selected.includes(areaName)) {
            layer.setStyle(style(e.target.feature))
            selected.splice(selected.indexOf(areaName), 1);
        } else {
            const color = "darkblue";
            selected.push(properties['Name_x'])
            layer.setStyle({ fillColor: color })
        }

        // layer.setStyle({
        //     fillColor: "#000000",
        //     weight: 1,
        //     opacity: 1,
        //     color: 'white',
        //     dashArray: '2',
        //     fillOpacity: 0.7
        // });
        // setOnselect({
        //     names: selected.push(properties['Name_x']),
        //     //value: properties['Single-Detached'],
        // });
        // layer.bringToFront();
    })

    const mapStyle = {
        height: '60vh',
        width: '100%',
        margin: '0'
    }
    const style = (feature => {
        return ({
            fillColor: getColor(feature.properties['Single-Detached']),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
        });
    });
    function getColor(d) {
        if (d < 400000) return '#edf8fb';
        if (d < 600000) return '#b3cde3';
        if (d < 800000) return '#8c96c6';
        if (d < 1000000) return '#8856a7';
        if (d > 1000000) return '#810f7c';
    }
    function yearFilter(feature) {
        console.log(selectedButton);
        if (feature.properties.year === selectedButton) return true
    }
    const onEachFeature = (feature, layer) => {
        layer.on({
            click: (e) => {
                highlightFeature(e);
                console.log(selected);
            },
        });
    }

    function updateYear(year) {
        console.log(year);
        setSelectedButton(year);
        setOnSelect("doookieee")
        console.log(selectedButton)
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
                    <MapContainer center={[48.47, -123.5]}
                        zoom={10} scrollWheelZoom={true} style={mapStyle}>
                        <TileLayer
                            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                        />
                        {data && (
                            <GeoJSON data={data} style={style} filter={yearFilter} onEachFeature={onEachFeature} />
                        )}
                    </MapContainer>
                </div>
            </div >
        </div >

    )
}
export default Map;