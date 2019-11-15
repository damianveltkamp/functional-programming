const fetch = require('node-fetch')
const fs = require('fs')

const settings = {
    apiUrl: 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-26/sparql',
    query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX gn: <http://www.geonames.org/ontology#> 
PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>

SELECT ?cho ?title ?typeLabel ?long ?lat ?landLabel WHERE {

  <https://hdl.handle.net/20.500.11840/termmaster12435> skos:narrower* ?type .
  ?type skos:prefLabel ?typeLabel .
  ?foobar skos:exactMatch/wgs84:lat ?lat .
  ?foobar skos:exactMatch/wgs84:long ?long .
  ?foobar skos:exactMatch/gn:parentCountry ?land .
  ?land gn:name ?landLabel .
  ?cho edm:object ?type .
  ?cho dc:title ?title .
} LIMIT 10000`,
    outputPath: 'dist/data/output/',
    outputFileName: 'geoJsonData'
}

async function fetchdata(apiUrl, query) {
    const rawData = await fetch(apiUrl + '?query=' + encodeURIComponent(query) + '&format=json')
    const json = await rawData.json()
    return json
}

const geoJson = {
    type: 'FeatureCollection',
    features: []
}
const uniqueCordsContainer = []

fetchdata(settings.apiUrl, settings.query)
.then(data => processData(data))

function processData(data) {
    data.results.bindings
        .map(convertToFeatureObject)
        .map(pushFeatures)
    writeData(geoJson)
}

function convertToFeatureObject(item) {
    const feature = {
        type: 'Feature',
        properties: {
            // Add extra properties to the feature here i.e. Popups
            country: item.landLabel.value
        },
        geometry: {
            type: 'Point',
            coordinates: [
                parseFloat(item.long.value),
                parseFloat(item.lat.value)
            ]
        }
    }
    return feature
}

function pushFeatures(item) {
    try {
        geoJson.features.push(item)
    } catch(err) {
        console.log(err)
    }
}

function writeData(data, fileIndex = 0) {
    fs.writeFile(settings.outputPath + settings.outputFileName +"_"+ fileIndex +".json",
        JSON.stringify(data,null,4),
        { encoding: 'utf8', flag: 'wx'},
        function(err) {
            if (err && err.code == "EEXIST") {
                writeData(data, ++fileIndex)
            } else if (err) {
                return console.log(err)
            } else {
                console.log("The file was saved!")
            }
        })
}