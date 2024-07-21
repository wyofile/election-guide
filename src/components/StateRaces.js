import RaceCandidates from '@/components/RaceCandidates'
import DistrictMap from '@/components/DistrictMap'

import { useState } from 'react'

import '@/styles/components/state-races.css'

const StateRaces = ({houseDistricts, senateDistricts, candidates}) => {

  const [activeHouseDistrict, setActiveHouseDistrict] = useState(null)
  const [activeSenateDistrict, setActiveSenateDistrict] = useState(null)

  return (
    <>
      <h3 className='race-header'>Wyoming House of Representatives</h3>
      <p className="chamber-intro">Select a district from the map to view House of Representatives candidates.</p>

      <DistrictMap chamber='house' geoData={houseDistricts} setActiveDistrict={setActiveHouseDistrict} />
      <h3 className="district-title">{activeHouseDistrict ? `State House District ${parseInt(activeHouseDistrict.substring(1))}` : "No district selected."}</h3>
      <RaceCandidates district={activeHouseDistrict} candidates={candidates.filter((candidate)=>candidate.district === activeHouseDistrict )} />
      <br />
      <h3 className='race-header'>Wyoming Senate</h3>
      <p className="chamber-intro">Select a district from the map to view Senate candidates.</p>

      <DistrictMap chamber='senate' geoData={senateDistricts} setActiveDistrict={setActiveSenateDistrict} />
      <h3 className="district-title">{activeSenateDistrict ? `State Senate District ${parseInt(activeSenateDistrict.substring(1))}` : "No district selected."}</h3>
      <RaceCandidates district={activeSenateDistrict} candidates={candidates.filter((candidate)=> candidate.district === activeSenateDistrict )} />
    </>
  )
}

export default StateRaces