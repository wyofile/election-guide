import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'

import Layout from '../design/Layout'
import DistrictMap from '../components/DistrictMap'

import houseDistricts from '../data/house-districts.json'
import senateDistricts from '../data/senate-districts.json'
import textContent from '../data/static-text.json'

export async function getStaticProps() {
  return {
    props: {

    }
  }
}

const Home = () => {

  const [chamber, setChamber] = useState('house')
  const [activeHouseDistrict, setActiveHouseDistrict] = useState('H01')
  const [activeSenateDistrict, setActiveSenateDistrict] = useState('S01')

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

    <section>
      <a className="link-anchor" id="legislature"></a>
        <h2>Wyoming State Legislature</h2>
        <Markdown>{textContent.wyomingLegislatureIntro}</Markdown>

        <DistrictMap chamber='house' geoData={houseDistricts} setActiveDistrict={setActiveHouseDistrict} />
        <br />
        <DistrictMap chamber='senate' geoData={senateDistricts} setActiveDistrict={setActiveSenateDistrict} />
    </section>








    </Layout>
  )
}

export default Home