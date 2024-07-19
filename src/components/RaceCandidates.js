import '../styles/components/race-candidates.css'

import Link from 'next/link'
import Image from 'next/image'

import { pluralize } from '../lib/utils'
import { PARTIES } from '../lib/styles'

const Candidate = (props) => {
  console.log(props)
  const { slug, ballotName, party, color, hasPhoto, hasResponses, incumbent } = props
  let portraitPath = null
  if (hasPhoto) {
    portraitPath = `portraits/${slug}.png`
  } else if (party === 'REP') {
    portraitPath = "portraits/non-participantrepublican.png"
  } else if (party === 'DEM') {
    portraitPath = "portraits/non-participantdemocrat.png"
  } else {
    portraitPath = "portraits/non-participant.png"
  }

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

const RaceCandidates = ({candidates}) => {
  return (
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
  )
}

export default RaceCandidates

