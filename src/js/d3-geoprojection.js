const fetch = require('node-fetch')

const settings = {
    fetchUrl: '/data/output/geoJsonData_0.json'
}

async function fetchdata(fetchUrl) {
    const rawData = await fetch(fetchUrl)
    const json = await rawData.json()
    return json
}

fetchdata(settings.fetchUrl)
    .then(data => processData(data))

function processData(data) {

}