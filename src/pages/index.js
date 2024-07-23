import Markdown from 'react-markdown'
import { MarkdownExternalLinks } from '@/lib/styles'
import Link from 'next/link'

import Layout from '@/design/Layout'
import CandidateSearch from '@/components/CandidateSearch'
import StateRaces from '@/components/StateRaces'
import RaceCandidates from '@/components/RaceCandidates'
import ElectionStories from '@/components/ElectionStories';

import houseGeoData from '@/data/wyo-house-districts.json'
import senateGeoData from '@/data/wyo-senate-districts.json'
import textData from '@/data/static-text.json'
import candidateData from '@/data/candidate-data.json'

//decrease build index.html size
const getCandidateDataNoResponses = () => {
  const candidates = candidateData
  candidates.forEach(c => {
    delete(c.responses)
  })
  return candidates
}

export async function getStaticProps() {
  const candidates = getCandidateDataNoResponses()
  const textContent = textData
  const houseDistricts = houseGeoData
  const senateDistricts = senateGeoData
  return {
    props: {
      candidates,
      textContent,
      houseDistricts,
      senateDistricts
    }
  }
}

const Home = ({candidates, textContent, houseDistricts, senateDistricts}) => {

  const pageDescription = textContent.guideIntro

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
      <MarkdownExternalLinks>{textContent.guideIntro}</MarkdownExternalLinks>
    </section>

    <CandidateSearch candidates={candidates} />

    <section>
      <a className="link-anchor" id="federal-delegation"></a>
      <h2 className='section-header'>Federal Delegation</h2>
      <h3 className="race-header">U.S. Senate</h3>
      <Markdown>{textContent.usSenateIntro}</Markdown>
      <RaceCandidates district='us-sen' candidates={candidates.filter((candidate)=>candidate.district === 'us-sen')} />
      <h3 className="race-header">U.S. House At-Large</h3>
      <Markdown>{textContent.usHouseIntro}</Markdown>
      <RaceCandidates district='us-house' candidates={candidates.filter((candidate)=>candidate.district === 'us-house')} />
    </section>

    <section>
      <a className="link-anchor" id="legislature"></a>
      <h2 className='section-header'>Wyoming State Legislature</h2>

      <Markdown>{textContent.wyomingLegislatureIntro}</Markdown>
      
      <StateRaces houseDistricts={houseDistricts} senateDistricts={senateDistricts} candidates={candidates.filter(candidate => candidate.district[0] != 'u' )}/>
    </section>

    <ElectionStories />

    <section>
      <a className="link-anchor" id="voter-faq"></a>
      <h2 className='section-header'>Common Voting Questions</h2>
      {textContent.voterFAQ.map((faq, i) => (
          <div key={i} className="faq-question">
            <h3 className='race-header'>{faq.question}</h3>
            <MarkdownExternalLinks>{faq.answer}</MarkdownExternalLinks>
          </div>
      ))}
    </section>

    <section>
      <h2 className='section-header'>About this Project</h2>
      <Markdown>{textContent.aboutProject}</Markdown>
      <Link className='return-to' href='https://www.wyofile.com'>Return to WyoFile.com »</Link>
    </section>

    </Layout>
  )
}

export default Home