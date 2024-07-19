const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')

const candidateDataPath = path.join(__dirname, './candidate-data.csv')
const fedResponsesPath = path.join(__dirname, './federal-responses.csv')
const legResponsesPath = path.join(__dirname, './wyo-leg-responses.csv')
const senHoldoversPath = path.join(__dirname, './senate-holdovers.csv')
const outputFilePath = path.join(__dirname, '../src/data/candidate-data.json')
const senHoldoversOutputPath = path.join(__dirname, '../src/data/senate-holdovers.json')

const candidateDataString = fs.readFileSync(candidateDataPath, 'utf-8')
const candidateData = parse(candidateDataString, {columns: true, bom: true, cast: (value, context)=>{
  if (value === 'TRUE'){
    return true
  } else if (value === 'FALSE') {
    return false
  } else {
    return value
  }
}})

const senHoldoversString = fs.readFileSync(senHoldoversPath, 'utf-8')
const senHoldoversData = parse(senHoldoversString, {columns: true, bom: true})

const fedResponsesString = fs.readFileSync(fedResponsesPath, 'utf-8')
const fedResponsesData = parse(fedResponsesString, {columns: true, bom: true})

const legResponsesString = fs.readFileSync(legResponsesPath, 'utf-8')
const legResponsesData = parse(legResponsesString, {columns: true, bom: true})

const canDataWithResponses = candidateData.map((candidate) => {
  debugger
  let candidateResponses = null
  if (candidate.district.slice(0,2) === 'us' && candidate.hasResponses){
    candidateResponses = fedResponsesData.find((response) => response.slug === candidate.slug)
  } else if (candidate.hasResponses) {
    candidateResponses = legResponsesData.find((response) => response.slug === candidate.slug)
  }
  if (candidateResponses) {
    delete candidateResponses.slug
    candidateResponses = Object.values(candidateResponses)
  }
  return({ ...candidate, "responses": candidateResponses})
})

fs.writeFileSync(outputFilePath,JSON.stringify(canDataWithResponses, null, 2))
fs.writeFileSync(senHoldoversOutputPath,JSON.stringify(senHoldoversData, null, 2))

 