import '../styles/components/race-candidates.css'

import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

import { getPortraitPath } from '@/lib/utils'

const Candidate = (props) => {
  const { slug, ballotName, party, color, hasPhoto, hasResponses, incumbent } = props
  const portraitPath = getPortraitPath(useRouter().basePath, hasPhoto, party, slug)

  return <div className="candidate" style={{ borderTop: `5px solid ${color}` }}><Link href={`/candidates/${slug}`}>
      <div className="portrait-col" >
          <div className="portrait-container">
              <Image
                  alt={ballotName}
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

export default Candidate