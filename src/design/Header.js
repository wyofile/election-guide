
import { css } from '@emotion/react'
import Link from 'next/link'

import updateTime from '../data/update-time.json'

import { formatDate } from '../lib/utils'

import { metaData } from '../config'

const headerStyle = css`  
  background-color: var(--tan7);
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
  padding: 1em;

  .title {
    color: var(--tan4);
    font-size: 3em;
    margin-bottom: 5px;
    margin-top: 0;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;

    a {
      color: var(--gray1);
    }
    a:hover {
      color: var(--link);
      text-decoration: none;
    }

    @media screen and (max-width: 468px) {
      font-size: 2em;
    }
  }
  .subtitle {
    color: var(--tan4);
    font-size: 1.15em;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    font-weight: normal;
  }
  .mtfp-blurb {
    text-align: center;
    color: var(--gray1);
    font-style: italic;
  }
  .donate-link {
    background-color: var(--link);
    color: white;
    /* color: var(--highlight); */
    /* border: 1px solid var(--highlight); */
    display: inline-block;
    padding: 0.2em 0.4em;
    border-radius: 2px;
    margin-left: 0.5em;

  }
  .update {
    color: var(--tan4);
    font-size: 0.9em;
    margin-top: 1em;
    text-align: center;
  }
  .ledein {
    color: white;
    text-align: center;
    text-transform: uppercase;
    color: var(--tan2);
    margin-bottom: 0.5em;
  }
  .mid-title-icon {
    font-size: 0.7em;
    display: inline-block;
    padding: 0.5em 0.5em 0.5em 0.75em;
    background-size: 100%;
    color: black;
    font-weight: bold;
    position: relative;
    top: -5px;
  }
`

const Header = () => {
  const { webSubtitle } = metaData
  return <div css={headerStyle}>
    <h2 className="ledein">WyoFile</h2>
    <h1 className="title"><Link href="/">
      Election Guide
    </Link></h1>
    <h2 className="subtitle">{webSubtitle}</h2>
    <div className="update">
      Last update: {formatDate(new Date(updateTime.updateTime))}
    </div>
  </div>
}

export default Header