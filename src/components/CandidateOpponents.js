import { PARTIES } from '@/lib/styles'
import { pluralize, getPortraitPath } from '@/lib/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Candidate = (props) => {
  const { slug, ballotName, party, hasPhoto, isCurrentPage } = props
  const partyInfo = PARTIES.find(d => d.key === party)
  const router = useRouter()
  const portraitPath = getPortraitPath(router.basePath,hasPhoto,party,slug)
  return <div className={`opponent-candidate ${isCurrentPage && 'active-opp'}`}
      style={{
          borderTop: `3px solid ${partyInfo.color}`,
      }}
  >
      <Link href={`${slug}`} scroll={false}>
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

  const order = {
    "REP": 1,
    "DEM": 2,
    "IND": 3
  }

  opponents.sort((a, b) => a.lastName - b.lastName)
  opponents.sort((a, b) => order[a.party] - order[b.party])

  let prevParty
  opponents.forEach(opp => {
    opp["label"] = opp.party != prevParty
    prevParty = opp.party
  })

  return (
    <div className='opponents-container'>
      <h4 className='opponents-title'>Active candidates for {race}</h4>
      <div className="opp-grid">
        { opponents.map(c => {
          const party = PARTIES.find(p => p.key === c.party)
          const partyCount = opponents.filter(opp => opp.party === party.key).length
          return <div className="opp-tile" key={c.slug}>
            {c.label && <h4 className="bucket-label" style={{color: party.color}}>{pluralize(party.noun, partyCount)}</h4>}
            <Candidate key={c.slug} isCurrentPage={c.slug === currentSlug} {...c} />
          </div>
        })}
      </div>
    </div>
  )
}

export default CandidateOpponents
