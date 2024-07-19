
import Link from 'next/link'

import '../styles/nav.css'


// TODO - figure out how to flow this elegantly from race data
// Will need to shuffle some races into a 'more things' column
// Hover drop downs with each active candidate name
const PAGE_LINKS = [
    { path: '/', label: 'All Races' },
    { path: '/#federal-delegation', label: 'Federal Delegation' },
    { path: '/#legislature', label: 'Wyoming Legislature' },
    // { path: '/#ballot-initiatives', label: 'Ballot Initiatives' },
    // { path: '/#judge-retention', label: 'Judge Retention'},
    { path: '/#voter-faq', label: 'Voting Info' }
]

const Nav = ({ location }) => {
    // const currentPath = `${location.pathname}${location.hash}`
    // const isActiveStyle = (currentPath === l.path) ? activeStyle : null]
    const isActiveStyle = null

    const links = PAGE_LINKS.map(l => {
        return (<Link key={l.path} href={l.path}><li className="nav-menu-item" key={l.path}>{l.label}</li></Link>)
    })

    return <div className="nav">
        <ul className="nav-menu">
            {links}
        </ul>
    </div >
}

export default Nav

