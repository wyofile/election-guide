import Link from 'next/link'

import updateTime from '../data/update-time.json'
import { formatDate } from '../lib/utils'
import { metaData } from '../config'

import ShareButtons from '@/components/ShareButtons'

const DONATE_LINK = 'https://wyofile.fundjournalism.org/donate/?campaign=701Pl00000HAVgjIAH'

const Header = () => {
  const { webSubtitle } = metaData
  return <div className="header">
    <div className="header-interior">
      <div className="header-center">
        <Link href="https://wyofile.com"><h1 className="site-title">WyoFile</h1></Link>
        <h1 className="election-guide-title"><Link href="/">
          ELECTION GUIDE 2024
        </Link></h1>
        <h2 className="subtitle">{webSubtitle}</h2>
        
        <Link target="_blank" href={ DONATE_LINK }><div className="button">Support this work</div></Link>
        <div className="update">
          Last update: {formatDate(new Date(updateTime.updateTime))}
        </div>
      </div>
    </div>
    <ShareButtons url="https://projects.wyofile.com/election-guide-2024" />
  </div>
}

export default Header