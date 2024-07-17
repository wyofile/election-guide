import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'

import Layout from '../design/Layout'
import DistrictMap from '../components/DistrictMap'
import CandidateSearch from '../components/CandidateSearch'

import houseDistricts from '../data/house-districts.json'
import senateDistricts from '../data/senate-districts.json'
import textContent from '../data/static-text.json'
import candidates from '../data/candidate-data.json'

import '../styles/index.css'

const Home = () => {

  const [chamber, setChamber] = useState('house')
  const [activeHouseDistrict, setActiveHouseDistrict] = useState(null)
  const [activeSenateDistrict, setActiveSenateDistrict] = useState(null)

  const pageDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat mauris nunc congue. Ut enim blandit volutpat maecenas volutpat. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Magna etiam tempor orci eu lobortis elementum nibh. Arcu risus quis varius quam quisque id diam vel quam. Egestas diam in arcu cursus euismod."

  return (
    <Layout 
      relativePath='/'
      pageTitle={"Wyoming's 2024 Candidates | 2024 Wyoming Election Guide"}
      pageDescription={pageDescription}
      siteSeoTitle={"Wyoming's 2024 Candidates | WyoFile 2024 Election Guide"}
      seoDescription={pageDescription}
      socialTitle={"The WyoFile 2024 Election Guide"}
      socialDescription={"Federal and state candidates seeking Wyoming office in 2024."}
    >

    <section className="guide-intro">
      <Markdown>{textContent.guideIntro}</Markdown>
    </section>

    <CandidateSearch candidates={candidates} />

    <section>
      <a className="link-anchor" id="federal-delegation"></a>
      <h2 className='section-header'>Federal Delegation</h2>
      <h3 className="race-header">U.S. Senate</h3>
      <Markdown>{textContent.usSenateIntro}</Markdown>
      <h3 className="race-header">U.S. House At-Large</h3>
      <Markdown>{textContent.usHouseIntro}</Markdown>
    </section>

    <section>
      <a className="link-anchor" id="legislature"></a>
      <h2 className='section-header'>Wyoming State Legislature</h2>

      <Markdown>{textContent.wyomingLegislatureIntro}</Markdown>

      <h3 className='race-header'>Wyoming House of Representatives</h3>
      <p>Select a district from the map to view House of Representatives candidates.</p>
      <DistrictMap chamber='house' geoData={houseDistricts} setActiveDistrict={setActiveHouseDistrict} />
      <h2 className="district-title">{activeHouseDistrict ? `State House District ${activeHouseDistrict}` : "No district selected."}</h2>
      <br />
      <h3 className='race-header'>Wyoming Senate</h3>
      <p>Select a district from the map to view Senate candidates.</p>

      <DistrictMap chamber='senate' geoData={senateDistricts} setActiveDistrict={setActiveSenateDistrict} />
      <h2 className="district-title">{activeSenateDistrict ? `State Senate District ${activeSenateDistrict}` : "No district selected."}</h2>
    </section>

    <section>
      <a className="link-anchor" id="voter-faq"></a>
      <h2 className='section-header'>Common Voting Questions</h2>
      {textContent.voterFAQ.map((faq, i) => (
          <div key={i} className="faq-question">
            <h3 className='race-header'>{faq.question}</h3>
            <Markdown>{faq.answer}</Markdown>
          </div>
      ))}
    </section>

    <section>
      <h2 className='section-header'>About this Project</h2>
      <Markdown>{textContent.aboutProject}</Markdown>
    </section>








    </Layout>
  )
}

export default Home