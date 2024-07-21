import Link from 'next/link'
import '@/styles/components/candidate-links.css'

const CandidateLinks = ({wyoleg, website, email}) => {
  return(
    <ul className='candidate-links'>
      <li className='candidate-link'><Link href="#questionnaire">On The Issues</Link></li>
      <li className='candidate-link'><Link href="#coverage">WyoFile Coverage</Link></li>
      {wyoleg && <li className='candidate-link'><Link href={wyoleg} target="_blank">WyoLeg Profile <img src="/election-guide-2024/external.svg"></img></Link></li>}
      {website && <li className='candidate-link'><Link href={`https://${website}`} target="_blank">Candidate Website <img src="/election-guide-2024/external.svg"></img></Link></li>}
      {email && <li className='candidate-link'><Link href={`mailto:${email.toLowerCase()}`} target="_blank">Campaign Contact</Link> 📧</li>}
    </ul>
  )
}

export default CandidateLinks