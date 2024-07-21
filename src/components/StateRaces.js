
import React, { useState, Suspense } from 'react'

import RaceCandidates from '@/components/RaceCandidates'
const DistrictMap = React.lazy(()=> import('@/components/DistrictMap'));
import '@/styles/components/state-races.css'

const StateRaces = ({houseDistricts, senateDistricts, candidates}) => {
  const [chamber, setChamber] = useState('house')
  const [activeHouseDistrict, setActiveHouseDistrict] = useState(null)
  const [activeSenateDistrict, setActiveSenateDistrict] = useState(null)



  return (
    <>
      <div className='chamber-selector'>
        <div className={`selector ${chamber === 'house' ? 'active' : ''}`} onClick={() => setChamber('house')}>WY State House</div>
        <div className={`selector ${chamber === 'senate' ? 'active' : ''}`} onClick={() => setChamber('senate')}>WY State Senate</div>
      </div>
      <div className="state-race-container">
        <div className={`chamber-container ${chamber ==='house' ? 'visible' : ''}`}>
          <h3 className='race-header'>{activeHouseDistrict ? `State House District ${parseInt(activeHouseDistrict)}` : "Select a house district on the map"}</h3>
          <Suspense fallback={<div className="map-container">Loading...</div>}>
            <DistrictMap chamber='house' geoData={houseDistricts} setActiveDistrict={setActiveHouseDistrict} />
          </Suspense>
          <RaceCandidates chamber='house' district={`H${activeSenateDistrict}`} candidates={candidates.filter((candidate)=>candidate.district === `H${activeHouseDistrict}`)} />
        </div>
        <div className={`chamber-container ${chamber ==='senate' ? 'visible' : ''}`}>
          <h3 className='race-header'>{activeSenateDistrict ? `State Senate District ${parseInt(activeSenateDistrict)}` : "Select a senate district on the map"}</h3>
          <Suspense fallback={<div className="map-container">Loading...</div>}>
            <DistrictMap chamber='senate' geoData={senateDistricts} setActiveDistrict={setActiveSenateDistrict} />
          </Suspense>
          <RaceCandidates chamber='senate' district={activeSenateDistrict} candidates={candidates.filter((candidate)=> candidate.district === `S${activeSenateDistrict}`)} />
        </div>
      </div>
    </>
  )
}

export default StateRaces