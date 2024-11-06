import Markdown from 'react-markdown'
import { MarkdownExternalLinks } from '@/lib/styles'
import Link from 'next/link'

import Layout from '@/design/Layout'
import CandidateSearch from '@/components/CandidateSearch'
import StateRaces from '@/components/StateRaces'
import RaceCandidates from '@/components/RaceCandidates'
import ElectionStories from '@/components/ElectionStories';
import JudgeList from '@/components/JudgeList'
import RaceResults from '@/components/RaceResults'

import textData from '@/data/static-text.json'
import candidateData from '@/data/candidate-data.json'
import ballotPropositionData from '@/data/ballot-proposition-results.json'
import updateTime from '../data/update-time.json'

import { formatDateTime } from '../lib/utils'
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
  const ballotPropositionResults = ballotPropositionData
  return {
    props: {
      candidates,
      textContent,
      ballotPropositionResults
    }
  }
}

const Home = ({candidates, textContent, ballotPropositionResults}) => {

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
      <div className="election-day-note"><img src='/election-guide-2024/info.svg' /><span>For live general election results <a href="https://wyofile.com/wyoming-general-election-results-2024/">go here</a>. The election guide will be periodically updated with results after the polls close.</span></div>
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
      <RaceResults results={ballotPropositionResults} raceTitle="Results - Constitutional Amendment A" isUncontested={false} voteType='Position'/>
      <div className="results-source">Election results provided by the Associated Press. Last updated {formatDateTime(new Date(updateTime.updateTime))}</div>
    </section>

    <section>
      <a className="link-anchor" id="judge-retention"></a>
      <h2 className='section-header'>Judge Retention</h2>
      <MarkdownExternalLinks>{textContent.judgeRetentionIntro}</MarkdownExternalLinks>
      <JudgeList/>
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