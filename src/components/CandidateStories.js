import Link from 'next/link'
import { useStoriesWithSlug } from '@/lib/dataHooks'

import '../styles/components/election-coverage.css'
import { formatDate } from '../lib/utils'

const ELECTION_COVERAGE = 'https://wyofile.com/elections-2024/'

const CandidateStories = ({slug, ballotName}) => {
  const {stories, loading, error} = useStoriesWithSlug(12, slug)
  return(
    <div className='election-coverage-candidate'>
    {error && <div className="load-error">Unable to Load Stories</div>}
    {loading && <div className="loading">Loading...</div>}
    {stories && 
      <>
        {stories.length === 0 && <p>Currently no WyoFile stories on {ballotName}.</p>}
        <div className="election-coverage-stories">
          {stories.map(story => {
            return(
              <Link key={`story-${story.id}`} href={story.link} target="_blank">
                <div className="election-coverage-story">
                  <div className="story-title">{story.title.rendered}</div>
                  <div className="story-date">{formatDate(new Date(story.date))}</div>
                  <div className="fake-link">Read Story <img src="/election-guide-2024/external.svg"></img></div>
                </div>
              </Link>
            )
          })}
        </div>
      </>
    }
    <Link className='more-news-link' href={ELECTION_COVERAGE} target="_blank" >More election coverage on WyoFile.com <img src="/election-guide-2024/external.svg"></img></Link>
    </div>
  )
}

export default CandidateStories