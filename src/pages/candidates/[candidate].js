import candidateData from '../../data/candidate-data.json'
import textData from '../../data/static-text.json'
import wyoLegQs from '../../data/wyo-leg-qs.json'
import federalQs from '../../data/federal-qs.json'

import CandidateOpponents from '@/components/CandidateOpponents'
import CandidatePageSummary from '@/components/CandidatePageSummary'
import CandidateLinks from '@/components/CandidateLinks'
import Layout from '@/design/Layout'
import { formatRace } from '@/lib/utils'

import Markdown from 'react-markdown'

import '../../styles/candidate.css'


export async function getStaticPaths() {
  // Define routes that should be used for /[candidate] pages
  const slugs = candidateData.map(c => c.slug)
  return {
    paths: slugs.map(d => ({ params: { candidate: d } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const candidate = candidateData.find(c => c.slug === params.candidate)
  const activeOpponents = candidateData.filter(c => (c.district === candidate.district && c.status ==='active'))
  const questions = (candidate.district[0] === 'u' ? federalQs : wyoLegQs)
  const questionnaireIntro = textData.questionnaireIntro
  // Populate page props
  return {
      props: {
        candidate,
        activeOpponents,
        questions,
        questionnaireIntro
      }
  }
}

export default function CandidatePage({candidate, questions, questionnaireIntro, activeOpponents}) {

  const pageDescription = `${candidate.ballotName} (${candidate.party}) is running as a candidate for ${formatRace(candidate.district)} in Wyoming's 2024 election. See biographic details, issue positions and information on how to vote.`
  return (
    <Layout 
      relativePath={candidate.slug}
      pageTitle={`${candidate.ballotName} | ${formatRace(candidate.district)} | 2024 Wyoming Election Guide`}
      pageDescription={pageDescription}
      siteSeoTitle={`${candidate.ballotName} | ${formatRace(candidate.district)} | WyoFile 2024 Election Guide`}
      seoDescription={pageDescription}
      socialTitle={`${candidate.ballotName} | The WyoFile 2024 Election Guide`}
      socialDescription={`Candidate for ${formatRace(candidate.district)}`}
    >
    <CandidatePageSummary candidate={candidate} />

    <CandidateLinks wyoleg={candidate.wyoleg} website={candidate.website} email={candidate.email}/>

    <CandidateOpponents opponents={activeOpponents} currentSlug={candidate.slug} race={formatRace(candidate.district)} />

    <section>
      <a className="link-anchor" id="questionnaire"></a>
      <h2 className='section-header'>On the Issues</h2>
      <Markdown>{questionnaireIntro}</Markdown>
      <div className="on-the-issues">
        {questions.map((q, i) => {
          const answer = candidate.responses ? candidate.responses[i] : "_No Candidate Response._"
          return(
            <div key={`question-${i}`}>
              <h3 className="question-header">{q}</h3>
              <div className="answer">
                <Markdown>{answer}</Markdown>
              </div>
            </div>
          )
        })}
      </div>

    </section>
      <a className="link-anchor" id="coverage"></a>
      <h2 className='section-header'>WyoFile Coverage of {candidate.lastName}</h2>
    <section>

    </section>



    </Layout>
  )
}