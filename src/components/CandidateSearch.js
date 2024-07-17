import { useState } from "react";
import Link from "next/link";

import '../styles/components/candidate-search.css'

// import { PARTIES, STATUS } from "@/lib/styles";





const PLACEHOLDER = 'Enter candidate (e.g., John Barasso)'

// function Candidate(props) {
//     const { slug, path, displayName, party, status, race,
//         summaryLine, cap_tracker_2023_link, hasResponses, numMTFParticles } = props
//     // cap_tracker_2023_link flags for current lawmakers
//     const partyInfo = PARTIES.find(d => d.key === party)
//     const statusInfo = STATUS.find(d => d.key === status)
//     return <div css={candidateStyle} style={{ borderTop: `3px solid ${partyInfo.color}` }}><Link href={`/${path}/${slug}`}>
//         <div className="portrait-col" >
//             <div className="party" style={{ background: partyInfo.color }}>{party}</div>
//         </div>
//         <div className="info-col">
//             <div>
//                 <div className="name">{displayName}</div>
//                 {summaryLine && <div className="current">{summaryLine}</div>}
//                 {cap_tracker_2023_link && <div className="current">Sitting lawmaker</div>}
//                 <div className="position"><span style={{ color: partyInfo.color }}>{partyInfo.noun}</span> for {race}</div>
//                 <div className="status">{statusInfo.label}</div>

//                 <div className="tag-line">
//                     {hasResponses && <span className="tag">✏️ Candidate Q&A</span>}
//                     {(numMTFParticles > 0) && <span className="tag">📰 <strong>{numMTFParticles}</strong> {(numMTFParticles === 1) ? 'article' : 'articles'}</span>}
//                 </div>
//             </div>

//             <div className="fakelink">See more »</div>
//         </div>
//     </Link ></div >
// }

const CandidateSearch = ({candidates}) => {
    const [searchText, setSearchText] = useState('')

    const matchingCandidates = ((searchText !== null) && (searchText.length < 3)) ? []
        : candidates
            .filter(d => d.displayName.toUpperCase().includes(searchText.toUpperCase()))
            .slice(0, 5)

    function handleChange(event) {
        const input = event.target.value
        setSearchText(input)
    }

    return <div className="search-box">
        <div className="ledein">Search 2024 Wyoming candidates by name</div>
        <div className="note">This guide includes federal and legislative candidates. County commissioners and other local positions are excluded.</div>
        <form>
            <input onChange={handleChange} type="text" value={searchText} placeholder={PLACEHOLDER} />
        </form>
        <div>
            {/* {
                matchingCandidates.map(c => <Candidate key={c.slug} {...c} />)
            } */}
        </div>
    </div>
}

export default CandidateSearch