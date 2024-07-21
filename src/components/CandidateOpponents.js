import { PARTIES } from '@/lib/styles'
import { pluralize, getPortraitPath } from '@/lib/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import '@/styles/components/candidate-opponents.css'

const Candidate = (props) => {
  const { slug, ballotName, party, hasPhoto, isCurrentPage } = props
  const partyInfo = PARTIES.find(d => d.key === party)
  const router = useRouter()
  const portraitPath = getPortraitPath(router.basePath,hasPhoto,party,slug)
  return <div className='opponent-candidate'
      style={{
          borderTop: `3px solid ${partyInfo.color}`,
          fontWeight: isCurrentPage ? 'bold' : null,
      }}
  >
      <Link href={`${slug}`}>
          <div className="opp-portrait-col">
            <div className="opp-portrait-container">
              <Image
                  alt={`${ballotName}`}
                  src={portraitPath}
                  width={40}
                  height={40}
                  style={{
                      width: '100%',
                      height: 'auto',
                  }}
              />
            </div>
          </div>
          <div className="opp-info-col">
              <div className="opp-name">{ballotName}</div>
          </div>
      </Link >
  </div >
}

const CandidateOpponents = ({opponents, race, currentSlug}) => {
  return (
    <div className='opponents-container'>
      <h4 className='opponents-title'>Active candidates for {race}</h4>
        <div className="opp-party-buckets">
            {
              PARTIES.map(party => {
                const opponentsInParty = opponents.filter(d => d.party === party.key)
                if (opponentsInParty.length === 0) return null
                return <div className="opp-party-bucket" key={party.key} style={{ borderLeft: `0px solid ${party.color}` }}>
                    <h4 style={{
                        color: party.color
                    }}>{pluralize(party.noun, opponentsInParty.length)}</h4>
                    <div className="opp-party-list">{opponentsInParty.map(d => 
                      <Candidate key={d.slug} isCurrentPage={d.slug === currentSlug} {...d} />)}</div>
                </div>
              })
            }
        </div>
    </div>
  )
}

export default CandidateOpponents
