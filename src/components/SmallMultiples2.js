import * as d3 from "d3";

export default function SmallMultiples2({data, svgRef, selected, selectedColors, dimension}) {



console.log(dimension)


var margin = {top: 30, right: 30, bottom: 10, left: 60},
    width = 750 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // Add X axis --> it is a date format
    function reDate (d) {
        return d3.utcParse("%Y")(d)
    }

    var svg = d3.select(svgRef.current)
    .append("svg")
    .attr("width", 800)
    .attr("height", 800)



    svg.append("text")
    .attr("x", 750/2)             
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("transform", `translate(60, ${margin.top})`)
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text(dimension)

var xmin = 2005, xmax= 2018
data = JSON.parse(data);
var x = d3.scaleTime()
.domain([reDate(xmin), reDate(xmax)])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(60," +`${height + margin.top}`+ ")")
.call(d3.axisBottom(x));




var lineFunc = d3.line()
.x(function(d) { return x(reDate(d.Year))})
.y(function(d) { 
    const val = toInt(d.value)
    return y(val) })



var ymin = 1000000, ymax = 0;
function getData() {
    var returnData = []
    data.map((d) => {
        if (d.variable === dimension){
            returnData = [...returnData, d]
            if (selected.includes(d.Neighbourhood)){
                ymin = d3.min([ymin, ...d.data.map(a => toInt(a.value))])
                ymax = d3.max([ymax, ...d.data.map(a => toInt(a.value))])
            }
            }
    })
    
    return returnData
}

const newData = getData()
// Add Y axis
var y = d3.scaleLinear()
    .domain([ymin, ymax])
    .range([ height, 0 ]);
svg.append("g")
.attr("transform", `translate(60, ${margin.top})`)
    .call(d3.axisLeft(y));


function toInt(x){
    if (typeof x == 'string'){
        x = parseInt(x.replace(',', ''))

    }

    return x
}



newData.map((d) => {
    const neighbourhood = d.Neighbourhood
    const color = selectedColors[neighbourhood]
    console.log(color)
    if (selected && selected.includes(neighbourhood)){
        svg.append('path')
        .attr('d', lineFunc(d.data))
        .attr('stroke', color)
        .attr('stroke-width', 5)
        .attr('fill', 'none')
        .attr("transform", `translate(60, ${margin.top})`)
    }})



}
