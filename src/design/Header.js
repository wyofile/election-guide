import Link from 'next/link'

import updateTime from '../data/update-time.json'

import { formatDate } from '../lib/utils'

import { metaData } from '../config'
import "../styles/base.css"
import "../styles/header.css"

const Header = () => {
  const { webSubtitle } = metaData
  return <div className="header">
    <div className="header-interior">
      <div className="header-center">
        <Link href="https://wyofile.com"><h1 className="site-title">WyoFile</h1></Link>
        <h1 className="election-guide-title"><Link href="/">
          2024 Election Guide
        </Link></h1>
        <h2 className="subtitle">{webSubtitle}</h2>
        <Link href=""><div className="button">Support this work</div></Link>
        <div className="update">
          Last update: {formatDate(new Date(updateTime.updateTime))}
        </div>
      </div>
    </div>
  </div>
}

export default Header