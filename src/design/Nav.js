
import Link from 'next/link'

const PAGE_LINKS = [
    { path: '/', label: 'All Races' },
    { path: '/#federal-delegation', label: 'Federal Delegation' },
    { path: '/#legislature', label: 'Wyoming Legislature' },
    { path: '/#ballot-proposition', label: 'Ballot Proposition' },
    // { path: '/#judge-retention', label: 'Judge Retention'},
    { path: '/#voter-faq', label: 'Voting Info' }
]

const Nav = () => {
    
    const links = PAGE_LINKS.map(l => {
        return (<Link key={l.path} href={l.path}><li className="nav-menu-item" key={l.path}>{l.label}</li></Link>)
    })

    return (
        <div className="nav">
            <ul className="nav-menu">
                {links}
            </ul>
        </div>
    )
}

export default Nav

