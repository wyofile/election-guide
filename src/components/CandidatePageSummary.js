import Image from "next/image";
import { css } from "@emotion/react";

import { PARTIES } from '../lib/styles'
import { formatRace, getPortraitPath } from '../lib/utils'



const CandidatePageSummary = ({candidate}) => {

  const {party, slug, ballotName, district, incumbent, hasPhoto} = candidate
  const partyInfo = PARTIES.find(d => d.key === party)
  
  const portraitPath = getPortraitPath(hasPhoto, party, slug)

  const imageBackgroundCss = css`
    background-image: ${partyInfo.gradientLeft},
                      ${partyInfo.gradientRight};
  `

  return <div className="candidate-summary" style={{ borderTop: `5px solid ${partyInfo.color}` }}>

      <div className="summ-portrait-col">
          <div className="summ-portrait-container" css={imageBackgroundCss}>
              <Image
                  alt={`${ballotName}`}
                  src={portraitPath}
                  width={200}
                  height={200}
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