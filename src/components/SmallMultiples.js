import * as d3 from "d3";

export default function SmallMultiples(
  { data, svgRef },
  {
    rows = 7,
    cols = 2,
    width = 800,
    height = 750,
    margin = { top: 20, bottom: 20, left: 40, right: 20 },
    visWidth = width - margin.left - margin.right,
    visHeight = height - margin.top - margin.bottom
  } = {}
) {
  const strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

  const row = d3
    .scaleBand()
    .domain(d3.range(rows))
    .range([0, visHeight])
    .paddingInner(0.2);

  const col = d3
    .scaleBand()
    .domain(d3.range(cols))
    .range([0, visWidth])
    .paddingInner(0.2);

  const minDate = data[0].rates[0].date;
  const maxDate = data[0].rates[data[0].rates.length - 1].date;

  const x = d3
    .scaleTime()
    .domain([strictIsoParse(minDate), strictIsoParse(maxDate)])
    .range([0, col.bandwidth()]);

  const industryToScaleAndArea = Object.fromEntries(
    data.map((d) => {
      const maxRate = d3.max(d.rates, (d) => d.rate);

      const y = d3
        .scaleLinear()
        .domain([0, maxRate])
        .range([row.bandwidth(), 0]);

      const area = d3
        .area()
        .x((d) => x(strictIsoParse(d.date)))
        .y((d) => y(d.rate));

      /*
        .area()
        .x((d) => x(strictIsoParse(d.date)))
        .y1((d) => y(d.rate))
        .y0((d) => y(0));
*/
      return [d.industry, { y, area }];
    })
  );

  // create and select an svg element that is the size of the bars plus margins

  const svg = d3
    .select(svgRef.current)
    .attr("width", visWidth + margin.left + margin.right)
    .attr("height", visHeight + margin.top + margin.bottom);

  svg.selectAll("*").remove();

  // append a group element and move it left and down to create space
  // for the left and top margins
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create a group for each small multiple

  const cells = g
    .append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("class", "cell")
    .attr("transform", (d) => `translate(${col(d.col)}, ${row(d.row)})`);

  cells
    .append("path")
    // access the area generator for this industry
    .attr("d", (d) => industryToScaleAndArea[d.industry].area(d.rates))
    .attr("stroke", "#333")
    .attr("fill", "steelblue");

  // add the area to each cell
  // add the y axis for each cell
  cells.each(function (d) {
    // select the group for this cell
    const group = d3.select(this);

    // get the y-scale for this industry
    const axis = d3
      .axisLeft(industryToScaleAndArea[d.industry].y)
      .ticks(3)
      .tickSizeOuter(0);

    group.call(axis).call((g) => g.select(".domain").remove());
  });
}
