import candidateData from '../../data/candidate-data.json'
import textData from '../../data/static-text.json'
import wyoLegQs from '../../data/wyo-leg-qs.json'
import federalQs from '../../data/federal-qs.json'

import CandidatePageSummary from '@/components/CandidatePageSummary'
import Layout from '../../design/Layout'
import { formatRace } from '@/lib/utils'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'

import '../../styles/candidate.css'

const getCandidate = pageSlug => {
  return candidateData.find(c => c.slug === pageSlug)
}

const getSlugs = () => {
  return candidateData.map(c => c.slug)
}

export async function getStaticPaths() {
  // Define routes that should be used for /[candidate] pages
  const slugs = getSlugs()
  return {
    paths: slugs.map(d => ({ params: { candidate: d } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const candidate = getCandidate(params.candidate)
  const questions = (candidate.district[0] === 'u' ? federalQs : wyoLegQs)
  const questionnaireIntro = textData.questionnaireIntro
  // Populate page props
  return {
      props: {
        candidate,
        questions,
        questionnaireIntro
      }
  }
}

export default function CandidatePage({candidate, questions, questionnaireIntro}) {

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

    <section>
      <a className="link-anchor" id="federal-delegation"></a>
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



    </Layout>
  )
}