const fetch = require('node-fetch');
const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX gn: <http://www.geonames.org/ontology#> 
PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
SELECT ?cho ?title ?lat ?long ?typeLabel WHERE {
  <https://hdl.handle.net/20.500.11840/termmaster12435> skos:narrower* ?type .
  ?type skos:prefLabel ?typeLabel .
  ?foobar skos:exactMatch/wgs84:lat ?lat .
  ?foobar skos:exactMatch/wgs84:long ?long .
  ?foobar skos:exactMatch/gn:parentCountry ?land .
  ?cho edm:object ?type .
  ?cho dc:title ?title .
} LIMIT 10`
const apiUrl = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-26/sparql'

async function fetchdata(apiUrl, query) {
    const rawData = await fetch(apiUrl + '?query=' + encodeURIComponent(query) + '&format=json')
    const json = await rawData.json()
    return json
}

fetchdata(apiUrl, query)
.then(data => test(data))

function test(data) {
}