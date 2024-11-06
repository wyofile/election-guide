
import candidateData from '../src/data/candidate-data.json' with {type: 'json'}
import nytData from './results-wyoming.json' with {type: 'json'}
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const races = nytData.races

const filteredRaces = races.filter(r => r.office === 'U.S. House' || r.office === 'U.S. Senate' || r.office === 'State House' || r.office === 'State Senate')
const ballotMeasuresRaw = races.filter(r => r.office === 'Constitutional Amendment')

const ballotMeasure = ballotMeasuresRaw.map(r => {
  const district = 'Ballot Proposition'
  const nytWinner = r.outcome.won[0]
  const candidates = r. reporting_units[0].candidates.map(c => {
    const nytSlug = c.nyt_id
    const winner = nytSlug === 'for'
    const votes = c.votes.total
    return {slug: nytSlug, winner: winner, votes: votes, ballotName: nytSlug.charAt(0).toUpperCase() + nytSlug.slice(1), party: 'IND' }
  })
  const totalVotes = r.reporting_units[0].total_votes
  return {district: district, candidates: candidates, totalVotes: totalVotes}
})[0]

const generalResults = filteredRaces.map(r => {
  let district

  if (r.office === 'U.S. House'){
    district = 'us-house'
  } else if (r.office === 'U.S. Senate') {
    district = 'us-sen'
  } else if (r.office === 'State House') {
    district = `H${r.seat.slice(9).padStart(2, '0')}`
  } else if (r.office ==='State Senate') {
    district = `S${r.seat.slice(9).padStart(2, '0')}`
  }

  const nytWinner = r.outcome.won[0]

  const candidates = r.reporting_units[0].candidates.map(c => {
    const nytSlug = c.nyt_id
    const winner = nytWinner === nytSlug
    console.log(nytSlug)
    const matchingCandidate = candidateData.find(cd => cd.nytId === nytSlug)
    
    const votes = c.votes.total
    const slug = matchingCandidate.slug
    const ballotName = matchingCandidate.ballotName
    return {slug: slug, winner: winner, votes: votes, ballotName: ballotName, party: matchingCandidate.party}
  })

  const totalVotes = r.reporting_units[0].total_votes

  return {district: district, candidates: candidates, totalVotes: totalVotes}
})

const outputFilePath = path.join(__dirname, '../src/data/general-results.json')
const ballotMeasuresOutputFilePath = path.join(__dirname, '../src/data/ballot-proposition-results.json')
fs.writeFileSync(outputFilePath,JSON.stringify(generalResults, null, 2))
fs.writeFileSync(ballotMeasuresOutputFilePath,JSON.stringify(ballotMeasure, null, 2))





