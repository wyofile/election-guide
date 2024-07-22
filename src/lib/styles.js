import Markdown from "react-markdown"

export const PARTIES = [
  { key: 'REP', noun: 'Republican', adjective: 'Republican', color: '#d73027' },
  { key: 'DEM', noun: 'Democrat', adjective: 'Democratic', color: '#4575b4' },
  { key: 'IND', noun: 'Independent', adjective: 'Independent', color: '#666' },
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