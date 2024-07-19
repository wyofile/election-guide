import candidateData from '../../data/candidate-data.json'
import staticText from '../../data/static-text.json'
import wyoLegQs from '../../data/wyo-leg-qs.json'
import federalQs from '../../data/federal-qs.json'

import CandidatePageSummary from '@/components/CandidatePageSummary'
import Layout from '../../design/Layout'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'

const pageDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat mauris nunc congue. Ut enim blandit volutpat maecenas volutpat. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Magna etiam tempor orci eu lobortis elementum nibh. Arcu risus quis varius quam quisque id diam vel quam. Egestas diam in arcu cursus euismod."

const CandidatePage = () => {
  const router = useRouter()
  const candidate = candidateData.find(d => d.slug === router.query.candidate)

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

      {candidate ? 
        <CandidatePageSummary candidate={candidate} />
      :
        <section>
          <h1 className="not-found">Candidate Not Found</h1>
        </section>
      }
    </Layout>
  )
}

export default CandidatePage