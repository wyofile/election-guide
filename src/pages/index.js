import Markdown from 'react-markdown'
import { MarkdownExternalLinks } from '@/lib/styles'
import Link from 'next/link'

import Layout from '@/design/Layout'
import CandidateSearch from '@/components/CandidateSearch'
import StateRaces from '@/components/StateRaces'
import RaceCandidates from '@/components/RaceCandidates'
import ElectionStories from '@/components/ElectionStories';

import textData from '@/data/static-text.json'
import candidateData from '@/data/candidate-data.json'

import { usePath } from '@/lib/utils'

// decrease build index.html size
const getCandidateDataNoResponses = () => {
  const candidates = candidateData.map(c => {
    const { hasPhoto, hasResponses, ballotName, slug, status, district, party, incumbent, tagId } = c
    return { hasPhoto, hasResponses, ballotName, slug, status, district, party, incumbent, tagId }
  })
  return candidates
}

export async function getStaticProps() {
  const candidates = getCandidateDataNoResponses()
  const textContent = textData
  return {
    props: {
      candidates,
      textContent
    }
  }
}

const Home = ({candidates, textContent}) => {

  const pageDescription = textContent.pageDescription

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
      <br />
      <h3 className="race-header">U.S. House At-Large</h3>
      <Markdown>{textContent.usHouseIntro}</Markdown>
      <RaceCandidates district='us-house' candidates={candidates.filter((candidate)=>candidate.district === 'us-house')} />
    </section>

    <section>
      <a className="link-anchor" id="legislature"></a>
      <h2 className='section-header'>Wyoming State Legislature</h2>

      <Markdown>{textContent.wyomingLegislatureIntro}</Markdown>
      
      <StateRaces candidates={candidates.filter(candidate => candidate.district[0] != 'u' )}/>
    </section>

    <ElectionStories />
    
    <section>
      <a className="link-anchor" id="ballot-proposition"></a>
      <h2 className='section-header'>Ballot Proposition</h2>
      <MarkdownExternalLinks>{textContent.ballotProposition}</MarkdownExternalLinks>
    </section>

    <section>
      <a className="link-anchor" id="judge-retention"></a>
      <h2 className='section-header'>Judge Retention</h2>
      <MarkdownExternalLinks>{textContent.judgeRetentionIntro}</MarkdownExternalLinks>
      <div className='faq-question'>
        <div className='sup-judges'>
          <div className='sup-judge-card'>
            <img className='jd-img' src={usePath(`/judicial-districts/generic.svg`)} alt='Statewide Map'/>
            <h3 className='jd-title'>Statewide</h3>
            <h4 className='court-title'>Supreme Court Justices</h4>
            <ul className='sup-judge-list'>
              {textContent.judgeContentNew.supremeCourt.judges.map(judge => {
                return (<li className='sup-judge'><a href={judge.link}>Justice {judge.name} <img src={usePath('/external.svg')}/></a></li>)
              })}
            </ul>
          </div>
        </div>
        <div className='judge-districts'>
          {textContent.judgeContentNew.districts.map((district,i) => {
              return <div key={`d-${i}`} className='judge-district-card'>
                <img className='jd-img' src={usePath(`/judicial-districts/d-${(i+1)}.svg`)} alt={`${district.title} Map`}/>
                <h3 className='jd-title'>{district.title}</h3>
                <h4 className='jd-counties'>{district.counties}</h4>
                {district.districtJudges.length> 0 && <>
                  <h4 className='court-title'>District Judges</h4>
                  <ul className='sup-judge-list'>
                    {district.districtJudges.map((judge, i) => {
                      return <li key={`judge-${i}`} className='sup-judge'><a href={judge.link}>{judge.name} <img src={usePath('/external.svg')}/></a></li>
                    })}
                  </ul>
                </>}
                {district.circuitJudges.length > 0 && <>
                  <h4 className='court-title'>Circuit Judges</h4>
                  <ul className='sup-judge-list'>
                    {district.circuitJudges.map((judge, i) => {
                      return <li key={`judge-${i}`}className='sup-judge'><a href={judge.link}>Judge {judge.name} <img src={usePath('/external.svg')}/></a></li>
                    })}
                  </ul>
                </>}
              </div>
            })}
        </div>
      </div>
    </section>


    <section>
      <a className="link-anchor" id="voter-faq"></a>
      <h2 className='section-header'>Common Voting Questions</h2>
      {textContent.voterFAQ.map((faq, i) => (
          <div key={`faq-${i}`} className="faq-question">
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