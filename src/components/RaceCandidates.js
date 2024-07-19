import '../styles/components/race-candidates.css'

import senateHoldovers from '../data/senate-holdovers.json'

import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

import { pluralize, getPortraitPath } from '../lib/utils'
import { PARTIES } from '../lib/styles'

const Candidate = (props) => {
  const { slug, ballotName, party, color, hasPhoto, hasResponses, incumbent } = props
  const portraitPath = getPortraitPath(useRouter().basePath, hasPhoto, party, slug)

  return <div className="candidate" style={{ borderTop: `5px solid ${color}` }}><Link href={`/candidates/${slug}`}>
      <div className="portrait-col" >
          <div className="portrait-container">
              <Image
                  alt={`${ballotName}`}
                  src={portraitPath}
                  width={100}
                  height={100}
                  style={{
                      width: '100%',
                      height: 'auto',
                  }}
              />
          </div>
      </div>
      <div className="info-col">
          <div className="name">{ballotName}</div>
          <div className="summary-line">{incumbent ? 'Incumbent' : ''}</div>
          <div className="tag-line">
              {hasResponses && <span className="tag">✏️ Candidate Q&A</span>}
              {!hasResponses && <span className="tag">🚫 No Q&A response</span>}
          </div>
          <div className="fakelink">
              <span>See more »</span>
          </div>
      </div>
  </Link ></div >
}

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

const RaceCandidates = ({district, candidates}) => {
  return (
    <>
    {candidates.length > 0 &&
      <div className="party-buckets">
          {
              PARTIES.map(party => {
                  const candidatesInBucket = candidates.filter(candidate => candidate.party === party.key)
                  if (candidatesInBucket.length === 0) return null
                  return <div className="party-bucket" key={party.key} style={{ borderLeft: `3px solid ${party.color}` }}>
                      <h4 style={{
                          color: party.color
                      }}>{pluralize(party.noun, candidatesInBucket.length)}</h4>
                      <div>{candidatesInBucket.map(candidate => <Candidate key={candidate.slug} color={party.color} {...candidate} />)}</div>
                  </div>
              })
          }
      </div>
    }
    {(district && candidates.length === 0 && district[0] === 'S') && 
      <OutOfCycleBox holdover={senateHoldovers.find((holdover) => holdover.district === district)} />
    }
    </>
  )
}

export default RaceCandidates

