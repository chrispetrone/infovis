import React, { createRef, useEffect, useRef } from "react";
import * as d3 from "d3";
import { SVG } from "leaflet";


const SmallMultiples = () => {
    var housingData;
    d3.csv("smalldata.csv", function(data) {
            housingData = data
    })

    housingData = [
        {
            'name': "Oak Bay",
            'year': 2006,
            'age': 42
    },
    {
        'name': "Oak Bay",
        'year': 2011,
        'age': 44
    },  
    {
    'name': "Oak Bay",
    'year': 2016,
    'age': 47
    }
    ]
    housingData = require("./lettersAndWords.json");
    console.log("h", housingData)
    var svgRef = useRef();
    const svgEl = d3.select(svgRef.current)

    const wordDimensions = {
    margin :{top:10, bottom: 10, left: 10, right:10},
    visHeight : 700,
    visWidth : 1000
    }
    const {margin, visWidth, visHeight} = wordDimensions;
    const numrows = 7;
    const numcols = 4;

    const colScale = d3.scaleBand()
    .domain(d3.range(numcols))
    .range([0, wordDimensions.visWidth])
    .padding(0.05)

    const rowScale = d3.scaleBand()
      .domain(d3.range(numrows))
      .range([0, wordDimensions.visHeight])
      .padding(0.05)

    const svg = d3.create('svg')
    .attr('width', visWidth + margin.left + margin.right)
    .attr('height', visHeight + margin.top + margin.bottom)

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const cells = g.selectAll('g')
    .data(housingData)
    .join('g')
    .attr('transform', (d, i) => {
        const r = Math.floor(i / numrows);
        const c = i % numcols;
        //return `translate(${10}, ${10})`;
        return `translate(${colScale(c)}, ${rowScale(r)})`;
    })

    cells.selectAll('text')
    .data(d => d.words)
    .join('text')
    .attr('font-size', 15)
    .attr('x', 5)
    .attr('y', (d, i) => i * 15 + 2)
    .text(d => d)

    svgEl.append(svg)
    console.log(svgEl)
    // console.log("svg.node", svg.node())
    // console.log(cells)
    // return svg.node()
    return (
        <div>
        <svg id="svg"/>
        <p> here</p>
        </div>

    )
}

export default SmallMultiples