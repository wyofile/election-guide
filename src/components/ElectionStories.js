import Link from 'next/link'
import { useStoriesWithSlug } from '@/lib/dataHooks'


import { formatDate } from '../lib/utils'

const ELECTION_COVERAGE = 'https://wyofile.com/elections-2024/'
const ELECTION_SLUG = '2024election'
const NUM_STORIES = 6

const ElectionStories = () => {

  const {stories, error, loading} = useStoriesWithSlug(NUM_STORIES, ELECTION_SLUG)
  // const stories = []
  // const error = null;
  // const isLoading = false;
  return (
    <div className='election-coverage'>
      <div className='election-coverage-title'>Latest Election Coverage from WyoFile</div>
      {error && <div className="load-error">Unable to Load Stories</div>}
      {loading && <div className="loading">Loading...</div>}
      {stories && 
        <div className="election-coverage-stories">
          {stories.map(story => {
            return(
              <Link key={`story-${story.id}`} href={story.link} target="_blank">
                <div className="election-coverage-story">
                  <div className="story-title">{story.title.rendered}</div>
                  <div className="story-date">{formatDate(new Date(story.date))}</div>
                  <div className="fake-link">Read Story <img src="external.svg"></img></div>
                </div>
              </Link>
            )
          })}
        </div>
      }
    <Link className='more-news-link' href={ELECTION_COVERAGE} target="_blank" >More election coverage on WyoFile.com <img src="external.svg"></img></Link>
    </div>
  )
}

export default ElectionStories