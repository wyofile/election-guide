import Image from "next/image";
import {useRouter} from "next/router"

import { PARTIES } from '../lib/styles'
import { formatRace, getPortraitPath } from '../lib/utils'

import '../styles/components/candidate-page-summary.css'

const CandidatePageSummary = ({candidate}) => {
  const {party, slug, ballotName, district, incumbent, hasPhoto} = candidate

  const partyInfo = PARTIES.find(d => d.key === party)
  
  const portraitPath = getPortraitPath(useRouter().basePath, hasPhoto, party, slug)

  return <div className="candidate-summary" style={{ borderTop: `5px solid ${partyInfo.color}` }}>

      <div className="summ-portrait-col">
          <div className="summ-portrait-container">
              <Image
                  alt={`${ballotName}`}
                  src={portraitPath}
                  width={250}
                  height={250}
                  style={{
                      width: '100%',
                      height: 'auto',
                  }}
              />
          </div>
      </div>
      <div className="summ-info-col">
          <div className="summ-info-container">
              <div className="summ-intro-line">
                  <div>Wyoming <strong style={{ color: partyInfo.color }}>{partyInfo.adjective}</strong> candidate</div>
                  <div> for <strong>{formatRace(district)}</strong></div>
              </div>
              <h1 className="summ-name">{ballotName}</h1>
              <div className="incum-line">{incumbent ? "Incumbent" : ""}</div>
          </div>
      </div>
  </div>
}

export default CandidatePageSummary