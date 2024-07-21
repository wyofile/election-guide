import '../styles/components/race-candidates.css'

import senateHoldovers from '../data/senate-holdovers.json'

import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

import { pluralize, getPortraitPath } from '../lib/utils'
import { PARTIES } from '../lib/styles'

import Candidate from './Candidate'


const OutOfCycleBox = ({holdover}) => {
  const holdoverPartyInfo = PARTIES.find(party => party.key === holdover.party)
  console.log(holdoverPartyInfo)
  return (
    <div className="out-of-cycle-note">
      <div><strong>SD {parseInt(holdover.district.substring(1))}</strong> is out of cycle in 2024</div>
      <br />
      <div>
          <Link target="_blank" href={holdover.wyoleg} className="holdover" style={{ borderTop: `3px solid ${holdoverPartyInfo.color}` }}>
              <div className="holdover-party-icon" style={{ backgroundColor: holdoverPartyInfo.color }}>{holdover.party[0]}</div>
              <div className="holdover-info">
                <div className="holdover-name">Sen. {holdover.displayName}</div>
                <div className="wyoleg-note">
                  View on WyoLeg.gov <img src="external.svg"></img>
                </div>
              </div>
          </Link>
          <div>will represent the district as a holdover.</div>
      </div>
    </div>
  )
}

const RaceCandidates = ({district, candidates, chamber}) => {
  return (
    <>
    {candidates.length > 0 &&
      <div className="party-buckets">
          {
              PARTIES.map(party => {
                  const candidatesInBucket = candidates.filter(candidate => candidate.party === party.key)
                  const isUncontestedPrimary = candidatesInBucket.length === 1 && (party.key === "REP" || party.key === "DEM")
                  const isMinorPartyNoCandidates = candidatesInBucket.length === 0 && (party.key != "REP" && party.key != "DEM")
                  const isIndependent = party.key === 'IND'
                  
                  if (isMinorPartyNoCandidates) return null
                  return <div className="party-bucket" key={party.key} style={{ borderLeft: `3px solid ${party.color}` }}>
                      <h4 style={{
                          color: party.color
                      }}>{pluralize(party.noun, candidatesInBucket.length)}</h4>
                      {candidatesInBucket.length === 0 && <div className="party-note">No {party.adjective} candidates are running in this district.</div>}
                      <div>{candidatesInBucket.map(candidate => <Candidate key={candidate.slug} color={party.color} {...candidate} />)}</div>
                      {isUncontestedPrimary && <div className="party-note">This candidate is running uncontested in the {party.adjective} Primary.</div>}
                      {isIndependent && <div className="party-note">Independent candidates do not participate in a primary election. They must collect signatures to appear on the general election ballot.</div>}
                  </div>
              })
          }
      </div>
    }
    {(district && candidates.length === 0 && chamber === 'senate') && 
      <OutOfCycleBox holdover={senateHoldovers.find((holdover) => holdover.district === `S${district}`)} />
    }
    </>
  )
}

export default RaceCandidates

