import { PARTIES } from '../lib/styles'
import { numberFormat, percentFormat } from '../lib/utils'

const RaceResults = ({results, isUncontested, raceTitle, voteType}) => {


    return <div className="race-results">
        <div className="race-title">{raceTitle}</div>
        <table>
            <thead>
                <tr className="result-row">
                    <th className="result-row-name">{voteType}</th>
                    <th className="result-row-percent">Votes</th>
                    <th className="result-row-bar">Percentage</th>
                </tr>
            </thead>
            <tbody>{
                results.candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((c, i) => <Row key={i} {...c} totalVotes={results.totalVotes} isUncontested={isUncontested}/>)
            }</tbody>
        </table>
    </div>

}

export default RaceResults

const BAR_RANGE = 60
const Row = ({ ballotName, votes, winner, totalVotes, party, isUncontested }) => {
    const partyInfo = PARTIES.find(d => d.key === party)
    const votePercent = isUncontested || totalVotes === 0 ? 0.0 : (votes / totalVotes)
    const barWidth = votePercent * BAR_RANGE
    return <tr className="result-row" style={{
        backgroundColor: winner ? '#e3e3e3' : 'none',
        borderLeft: `5px solid ${partyInfo.color}`,
        fontWeight: winner ? 'bold' : 'normal',
    }}>
        <td className="result-row-name">
            {winner ? <span className="winner-icon" style={{ backgroundColor: partyInfo.color }}>✓</span> : ''}
            {ballotName}
        </td>
        <td className="result-row-percent">{isUncontested ? "N/A" : numberFormat(votes)}</td>
        <td className="result-row-bar"><svg width={BAR_RANGE + 50} height={14}>
            <rect fill={partyInfo.color} x={0} y={0} height={18} width={barWidth} />
            <text x={barWidth + 5} y={10}>{isUncontested ? "N/A" : percentFormat(votePercent)}</text>
        </svg></td>
    </tr>
}