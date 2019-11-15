const d3 = require('d3');
import {getFeatures} from './fetchfeatures.js'
import {drawMap} from './buildmap'
const mapSettings = {
    projection: d3.geoNaturalEarth1(),
    plotingDelay: 11,
    circleSize: 5
}
const svg = d3.select('svg')
drawVisualisation()

async function drawVisualisation() {
    drawMap(svg, mapSettings.projection)
    const data = await getFeatures('/data/output/geoJsonData_0.json')
    data.forEach(country => {
        plotBubbles(svg,country.featureObj,mapSettings.projection)
    })
    function plotBubbles(svg, data, projection) {

        // TODO domain dynamisch aan de hand van de data populaten, niet hardcoded 10000 entries
        var radius = d3.scaleLinear()
            .domain([0, 10000])
            .range([0, 50]);

        svg
            .selectAll('circles')
            .data([data])
            .enter()
            .append('circle')
            .attr('class', data.country)
            .attr('cx', function (d) { return projection(d.coordinates)[0] })
            .attr('cy', function (d) { return projection(d.coordinates)[1]; })
            .attr("r", function(d) { return radius(d.amount); })
            .style('fill', '#002951')
    }
}