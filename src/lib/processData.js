const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const inputFilePath = path.join(__dirname, '../../inputs/candidate-data.csv')
const outputFilePath = path.join(__dirname, '../data/candidate-data.json')

let csvString = fs.readFileSync(inputFilePath, 'utf-8')
csvString = csvString.replace(/^\uFEFF/gm, "");
const candidateData = parse(csvString, {columns: true})

fs.writeFileSync(outputFilePath,JSON.stringify(candidateData, null, 2))

 