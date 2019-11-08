const fs = require('fs')
const d3 = require('d3-dsv')

const settings = {
    filePath: 'data/functional-programming-enquete.csv',
    outputPath: 'data/output/',
    outputFileName: 'jsonData'
}

loadFile()

function loadFile(){
    fs.readFile(settings.filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            parseData(data)
        } else {
            console.log(err);
        }
    })
}

function parseData(source){
    var json = convertCsv(source)
    let selection = json.map(filterProperties)
    //TODO: Parse everything to int
    selection = selection
        .filter(removeEmptyEntries)
        .map(checkIfNoLoan)
        .map(removeNonNumericals)
        .map(calculateAverage)
    writeData(selection)
}

function convertCsv(source) {
    const psv = d3.dsvFormat(';');
    const data = psv.parse(source)
    return data
}

function filterProperties(item){
    return {
        studieschuld: item['Hoe hoog is je studieschuld op dit moment?']
    }
}

function removeEmptyEntries(item) {
    return item.studieschuld != ''
}

function checkIfNoLoan(item) {
    if(item.studieschuld === 'Geen studieschuld') {
        item.studieschuld = '0'
        return item
    } else {
        return item
    }
}

function removeNonNumericals(item) {
    console.log(item)
    item.studieschuld =  item.studieschuld.split('-')
    if(!item.studieschuld[1]) {
        item.studieschuld =  item.studieschuld[0].split(' ')
        if(item.studieschuld[2]) {
            item.studieschuld = {
                amount: item.studieschuld.splice(2,1),
                operator: '>'
            }

        }
    }
    return item
}

function calculateAverage(item) {
    if(item.studieschuld[1]) {
        const val1 = parseInt(item.studieschuld[0])
        const val2 = parseInt(item.studieschuld[1])
        const calc = (val1 + val2) / 2
        item.studieschuld = [
            {
                value1: val1.toString(),
                value2: val2.toString(),
                avarage: calc.toString()
            }
        ]
        return item
    } else {
        return item
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