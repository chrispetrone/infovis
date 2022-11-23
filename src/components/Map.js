import 'leaflet/dist/leaflet.css';
import React,{useState} from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
// import './Map.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

let data = require("./newareas.json")


const Map = ()=>{
    const mapStyle = {
        height: '60vh',
        width: '40%',
        margin: '0 auto',
        justifyContent: "flex-start",
        left: "0"
    }
    const style = (feature => {
        console.log("dookie")
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
        if (feature.properties.year === "2006") return true
    }
    console.log(data);
    return(
         <div className='container' width="200px">
            <div className="header">
            <h2 className='heading'>Regional Property Values in the CRD</h2>
            <p className="text-muted">A choropleth map displaying regional property <br/> assessments across the CRD.  Data collected <br/>from the CMHC surveys published over 10 years, <br/>in 2006, 2011, and 2016.</p></div>
            <div className="" >
                <div className="">
                <MapContainer center={[48.5, -123.5]}
                zoom={10} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />
                {data && (
                <GeoJSON data ={data} style={style} filter={yearFilter}/>
                )}
                </MapContainer>
                </div>
            </div>
        </div>

    )
}
export default Map;