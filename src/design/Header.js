import Link from 'next/link'

import updateTime from '../data/update-time.json'
import { formatDateTime } from '../lib/utils'
import { metaData } from '../config'

import Script from 'next/script'

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
          Last update: {formatDateTime(new Date(updateTime.updateTime))}
        </div>
      </div>
    </div>
    <div className='share-buttons'>
      <p className='share-label'>Share:</p>
      <div className="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-url="https://projects.wyofile.com/election-guide-2024">
        <a className="a2a_button_facebook"></a>
        <a className="a2a_button_bluesky"></a>
        <a className="a2a_button_whatsapp"></a>
        <a className="a2a_button_facebook_messenger"></a>
        <a className="a2a_button_email"></a>
        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
      </div>
      <Script id='a2a-config-script'>
        {
          `var a2a_config = a2a_config || {};
          a2a_config.num_services = 6;`
        }
      </Script>
      <Script async src="https://static.addtoany.com/menu/page.js" onReady={() => a2a?.init_all()}/>
    </div>
  </div>
}

export default Header