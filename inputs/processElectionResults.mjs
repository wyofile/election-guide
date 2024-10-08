
import candidateData from '../src/data/candidate-data.json' with {type: 'json'}
import nytData from './nyt-primary-results.json' with {type: 'json'}
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const races = nytData.races

const primaryResults = races.map(r => {
  let district
  let party

  if (r.office === 'U.S. House'){
    district = 'us-house'
  } else if (r.office === 'U.S. Senate') {
    district = 'us-sen'
  } else if (r.office === 'State House') {
    district = `H${r.seat.slice(9).padStart(2, '0')}`
  } else if (r.office ==='State Senate') {
    district = `S${r.seat.slice(9).padStart(2, '0')}`
  }

  if (r.party.nyt_id === 'GOP') {
    party = 'REP'
  } else {
    party = r.party.nyt_id
  }

  const nytWinner = r.outcome.won[0]

  const candidates = r.reporting_units[0].candidates.map(c => {
    const nytSlug = c.nyt_id
    const winner = nytWinner === nytSlug
    console.log(nytSlug)
    const matchingCandidate = candidateData.find(cd =>  {
      const slugParts = cd.slug.split('-')
      const last = slugParts[1]
      const firstInit = slugParts[0][0]
      return (`${last}-${firstInit}` === nytSlug)
    })
    
    const votes = c.votes.total
    const slug = matchingCandidate.slug
    const ballotName = matchingCandidate.ballotName
    return {slug: slug, winner: winner, votes: votes, ballotName: ballotName}
  })

  const totalVotes = r.reporting_units[0].total_votes

  return {district: district, party: party, candidates: candidates, totalVotes: totalVotes}
})

const outputFilePath = path.join(__dirname, '../src/data/primary-results.json')
fs.writeFileSync(outputFilePath,JSON.stringify(primaryResults, null, 2))

