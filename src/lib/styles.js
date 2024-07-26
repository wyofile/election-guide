import Markdown from "react-markdown"

export const PARTIES = [
  { key: 'REP', noun: 'Republican', adjective: 'Republican', gradientLeft: 'linear-gradient(to bottom, #ffffff 0%,#ffffff 13%,#ff1e1e 100%)', gradientRight: 'linear-gradient(to bottom, #ffffff 0%,#ffffff 15%,#fffdfd 16%,#ff2727 100%)' },
  { key: 'DEM', noun: 'Democrat', adjective: 'Democratic', gradientLeft: 'linear-gradient(to bottom, #fefefe 0%,#fcfefe 11%,#30c8dc 100%)', gradientRight: 'linear-gradient(to bottom, #fefefe 0%,#fefefe 8%,#fafdfd 10%,#2ac6db 100%)' },
  { key: 'IND', noun: 'Independent', adjective: 'Independent', color: '#666', gradientLeft: 'linear-gradient(to bottom, #ffffff 0%,#fefefe 10%,#f9f9f9 20%,#f1f1f2 28%,#dfe1e2 40%,#c0c3c5 55%,#676e74 86%,#5a6067 92%,#495158 100%)', gradientRight: 'linear-gradient(to bottom, #ffffff 0%,#fefefe 10%,#f9f9f9 20%,#f1f1f2 28%,#dfe1e2 40%,#c0c3c5 55%,#676e74 86%,#5a6067 92%,#495158 100%)' },
]

export const STATUS = [
  { key: 'active', label: '➡️ Active' },
  { key: 'lost-primary', label: '❌ Lost Aug. 20 primary' },
  { key: 'lost-general', label: '❌ Lost Nov. 5 general election' },
  { key: 'won', label: '✅ Won Nov. 5 general election' },
]

export const MarkdownExternalLinks = ({children}) => {
  return (
    <Markdown components={{ a(props){
      const {node, ...rest} = props
      return <a {...rest} target="blank">{node.children[0].value} <img src='/election-guide-2024/external.svg' style={{fill: 'var(--link)'}}/></a>
    }}}>
      {children}
    </Markdown>
  )
}