import judgeData from '@/data/judge-retention.json'
import { usePath } from '@/lib/utils'

const JudgeList = () => {
  return (
    <div className='faq-question'>
      <div className='sup-judges'>
        <div className='sup-judge-card'>
          <img className='jd-img' src={usePath(`/judicial-districts/generic.svg`)} alt='Statewide Map'/>
          <h3 className='jd-title'>Statewide</h3>
          <h4 className='court-title'>Supreme Court Justices</h4>
          <ul className='sup-judge-list'>
            {judgeData.supremeCourt.judges.map((judge, i) => {
              return (<li key={`judge-${i}`} className='sup-judge'><a href={judge.link} target="_blank">Justice {judge.name} <img src={usePath('/external.svg')}/></a></li>)
            })}
          </ul>
        </div>
      </div>
      <div className='judge-districts'>
        {judgeData.districts.map((district,i) => {
            return <div key={`d-${i}`} className='judge-district-card'>
              <img className='jd-img' src={usePath(`/judicial-districts/d-${(i+1)}.svg`)} alt={`${district.title} Map`}/>
              <h3 className='jd-title'>{district.title}</h3>
              <h4 className='jd-counties'>{district.counties}</h4>
              {district.districtJudges.length> 0 && <>
                <h4 className='court-title'>District Judges</h4>
                <ul className='sup-judge-list'>
                  {district.districtJudges.map((judge, i) => {
                    return <li key={`judge-${i}`} className='sup-judge'><a href={judge.link} target="_blank">{judge.name} <img src={usePath('/external.svg')}/></a></li>
                  })}
                </ul>
              </>}
              {district.circuitJudges.length > 0 && <>
                <h4 className='court-title'>Circuit Judges</h4>
                <ul className='sup-judge-list'>
                  {district.circuitJudges.map((judge, i) => {
                    return <li key={`judge-${i}`}className='sup-judge'><a href={judge.link} target="_blank">Judge {judge.name} <img src={usePath('/external.svg')}/></a></li>
                  })}
                </ul>
              </>}
            </div>
          })}
      </div>
    </div>
  )
}

export default JudgeList