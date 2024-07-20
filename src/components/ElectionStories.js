import useSwr from 'swr'
import Link from 'next/link'
import { useState, useEffect } from "react"

import '../styles/components/election-coverage.css'
import { formatDate } from '../lib/utils'

const API_PATH = 'https://wyofile.com/wp-json/wp/v2'
const ELECTION_COVERAGE = 'https://wyofile.com/elections-2024/'
const ELECTION_TAG_ID = 14174
const NUM_STORIES = 6

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ElectionStories = () => {

  const {data, error, isLoading} = useSwr(`${API_PATH}/posts?tag=${ELECTION_TAG_ID}&per_page=${NUM_STORIES}&fields[]=id&fields[]=date&fields[]=link&fields[]=title`, fetcher)

  return (
    <div className='election-coverage'>
      <div className='election-coverage-title'>Latest Election Coverage from WyoFile</div>
      {error && <div className="load-error">Unable to Load Stories</div>}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="election-coverage-stories">
          {data.map(story => {
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
      )}
    <Link className='more-news-link' href={ELECTION_COVERAGE} target="_blank" >View more election coverage on WyoFile.com <img src="external.svg"></img></Link>
    </div>
  )
}

export default ElectionStories