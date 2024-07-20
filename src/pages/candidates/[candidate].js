import candidateData from '../../data/candidate-data.json'
import textContent from '../../data/static-text.json'
import wyoLegQs from '../../data/wyo-leg-qs.json'
import federalQs from '../../data/federal-qs.json'

import CandidatePageSummary from '@/components/CandidatePageSummary'
import Layout from '../../design/Layout'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'

import '../../styles/candidate.css'

const pageDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat mauris nunc congue. Ut enim blandit volutpat maecenas volutpat. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Magna etiam tempor orci eu lobortis elementum nibh. Arcu risus quis varius quam quisque id diam vel quam. Egestas diam in arcu cursus euismod."

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
  
  // Populate page props
  return {
      props: {
        candidate
      }
  }
}

export default function CandidatePage({candidate}) {

  let questions = wyoLegQs
  if (candidate.district[0] === 'u') questions = federalQs

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
    <CandidatePageSummary candidate={candidate} />
    <section>
      <a className="link-anchor" id="federal-delegation"></a>
      <h2 className='section-header'>On the Issues</h2>
      <Markdown>{textContent.questionnaireIntro}</Markdown>
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