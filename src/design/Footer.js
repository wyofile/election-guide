import { css } from '@emotion/react'
import Image from 'next/image'

import { footerMenus } from '../config'

const footerStyle = css`

    font-size: 13px;

    display: block;

    font-family: futura-pt, Arial, Helvetica, sans-serif;
    background: #171818;
    color: #fff;

    @media (min-width: 782px) {
        padding-top: 2em;
    }
`

const footerLinksStyle= css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-color: #fff; 

`

const Footer = () => {


    return <footer css={footerStyle}>
      <ul css={footerLinksStyle}>
        <li><a href="https://wyofile.com/about/">About Us</a></li>
        <li><a href="https://wyofile.com/careers/">Careers</a></li>
        <li><a href="https://wyofile.com/write-for-us/">Write for us</a></li>
        <li><a href="https://wyofile.com/underwrite-wyofile/">Underwriting</a></li>
        <li><a href="https://wyofile.com/about/republish/">How to republish</a></li>
        <li><a href="https://wyofile.com/contact-us/">Contact us</a></li>
        <li><a href="https://wyofile.com/corrections/">Report an error</a></li>
        <li><a href="https://us20.campaign-archive.com/home/?u=2e37e4ef54eca217d5f47bda3&id=611470c970">Newsletter archive</a></li>
        <li><a href="https://wyofile.com/wyofile-mobile-app/">Mobile app</a></li>
      </ul>
      <div>© 2024 WyoFile</div>     
    </footer>
}

export default Footer