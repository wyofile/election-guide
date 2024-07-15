import React, { useState, useEffect } from 'react';

import Layout from '../design/Layout'

import DistrictMap from '../components/DistrictMap'

import houseDistricts from '../data/house-districts.json'
import senateDistricts from '../data/senate-districts.json'

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
    <h2>Select Your House District</h2>
    <span onClick={()=>setChamber('senate')}>Senate</span><span onClick={()=>setChamber('house')}>House</span>
    <h2>Active: {chamber}</h2>
    <DistrictMap chamber='house' geoData={houseDistricts} setActiveDistrict={setActiveHouseDistrict} />
    <DistrictMap chamber='senate' geoData={senateDistricts} setActiveDistrict={setActiveSenateDistrict} />
    <h2>Active House District: {activeHouseDistrict}</h2>
    <h2>Active Senate District: {activeSenateDistrict}</h2>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />




    </Layout>
  )
}

export default Home