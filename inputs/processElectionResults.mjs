import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';
import candidateData from '../src/data/candidate-data.json' with {type: 'json'}

const response = await fetch('http://projects.wyofile.com.s3-website.us-east-2.amazonaws.com/primary-results.json');
const data = await response.json();

candidateData.map(c => {
  let seat
  let office
  let party

  if (c.district === 'us-house'){
    seat = 'District 1'
    office = 'U.S. House'
  } else if (c.district === 'us-sen') {
    seat = 'Class I'
    office = 'U.S. Senate'
  } else {
    const districtNumber = parseInt(c.district.slice(-2))
    const chamberIdentifier = c.district[0]
    seat = `District ${districtNumber}`
    if (chamberIdentifier === 'H') {
      office = "State House"
    } else {
      seat = "State Senate"
    }
  }

  if (c.party === 'REP') {
    party = 'GOP'
  } else {
    party = c.party
  }

  if (party === 'IND') return c
  const result = data.find(race => race.seat === seat && race.office === office && race.party === party)

  
})

