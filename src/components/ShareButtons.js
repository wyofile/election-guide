import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from "react-share";

const ShareButtons = ({url}) => {
  return <div className='share-buttons'>
    
    <EmailShareButton  url={url}><EmailIcon size={30} borderRadius={10} /></EmailShareButton>
    <FacebookShareButton url={url}><FacebookIcon size={30} borderRadius={10} /></FacebookShareButton>
    <TwitterShareButton url={url}><TwitterIcon size={30} borderRadius={10} /></TwitterShareButton>
    <WhatsappShareButton url={url}><WhatsappIcon size={30} borderRadius={10} /></WhatsappShareButton>
    <FacebookMessengerShareButton url={url}><FacebookMessengerIcon size={30} borderRadius={10}  /></FacebookMessengerShareButton>
  </div>
}

export default ShareButtons