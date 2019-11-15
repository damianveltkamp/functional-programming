const d3 = require('d3')
const topojson = require('topojson')

export function drawMap(svg, projection) {
    const path = d3.geoPath().projection(projection)
    mapSetup(svg,path)
    drawCountries(svg, path)
}

function mapSetup(svg,path) {
    svg
        .append('path')
        .attr('class', 'sphere')
        .attr('d', path({ type: 'Sphere' }))
}

function drawCountries(svg, path) {
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json').then(data => {
        const countries = topojson.feature(data, data.objects.countries);
        svg
            .selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path)
    })
}
