import { css } from '@emotion/react'

import { PARTIES } from '../lib/styles'
import { numberFormat, percentFormat } from '../lib/utils'

const style = css`
    padding: 0.5em;
    .title {
        font-style: italic;
        margin-bottom: 0.5em;
    }
    table {
        width: 100%;
    }
    thead > .result-row {
        border-left: 5px solid white;
    }
    .result-row {
        display: flex;
        padding: 0.2em 0;
        height: 16px;
        font-size: 12px;

        border-bottom: 1px solid var(--gray2);

        th {
            color: var(--gray4);
            font-weight: normal;
        }
    }
    .winner-icon {
        background-color: #666;
        color: white;
        font-weight: bold;
        padding: 0.2em 0.5em;
        margin-right: 0.4em;
        margin-left: -4px;
    }
    .result-row-name {
        flex: 0 0 13em;
        color: var(--gray4);
        margin-right: 0.5em;
        padding-left: 5px;
        

    }
    .result-row-percent {
        flex: 0 0 4em;
        margin-right: 0.5em;
        text-align: right;
    }
    .result-row-bar {
        flex: 0 0 auto;
    }
    .date {
        font-style: italic;
        font-size: 14px;
        margin-top: 1em;
        margin-left: 0.3em;
    }
`

const PrimaryResults = ({results}) => {
    const primaryPartyLabel = PARTIES.find(d => d.key === results.party).adjective

    return <div css={style} className="primary-results">
        <div className="title">August 20 Primary{` – ${primaryPartyLabel} candidates`}</div>
        <table>
            <thead>
                <tr className="result-row">
                    <th className="result-row-name">Candidate</th>
                    <th className="result-row-percent">Votes</th>
                    <th className="result-row-bar">Percentage</th>
                </tr>
            </thead>
            <tbody>{
                results.candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((c, i) => <Row key={i} {...c} totalVotes={results.totalVotes} party={results.party}/>)
            }</tbody>
        </table>
    </div>

}

export default PrimaryResults

const BAR_RANGE = 60
const Row = ({ ballotName, votes, winner, totalVotes, party }) => {
    const partyInfo = PARTIES.find(d => d.key === party)
    const votePercent = votes / totalVotes
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
        <td className="result-row-percent">{numberFormat(votes)}</td>
        <td className="result-row-bar"><svg width={BAR_RANGE + 50} height={14}>
            <rect fill={partyInfo.color} x={0} y={0} height={18} width={barWidth} />
            <text x={barWidth + 5} y={12}>{percentFormat(votePercent)}</text>
        </svg></td>
    </tr>
}
