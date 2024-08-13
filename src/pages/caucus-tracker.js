// import candidateData from '@/data/candidate-data.json'

// const getCandidateCaucusData = () => {
//   const candidates = candidateData.map(c => {
//     const { lastName, ballotName, slug, caucus, district, party, incumbent } = c
//     return { lastName, ballotName, slug, caucus, district, party, incumbent }
//   })
//   return candidates
// }

// export const getStaticProps = async() => {
//   const candidates = getCandidateCaucusData()
//   return {
//     props: {
//       candidates
//     }
//   }
// }

const HOUSE_SEATING_CHART = [ ['empty', 'empty', 'aisle', 'empty', 'empty', 'aisle', 'empty', 'aisle', 'empty', 'empty', 'aisle', 'empty', 'H01', 'aisle', 'empty', 'empty'],
                              ['H47', 'H42', 'aisle', 'H61', 'H51', 'aisle', 'H56', 'aisle', 'H29', 'H32', 'aisle', 'H37', 'H19', 'aisle', 'H14', 'H23'],
                              ['H34', 'H33', 'aisle', 'H46', 'H16', 'aisle', 'H58', 'aisle', 'H36', 'H35', 'aisle', 'H38', 'H62', 'aisle', 'H22', 'H20'],
                              ['empty', 'H05', 'aisle', 'H02', 'H12', 'aisle', 'H24', 'aisle', 'H21', 'H49', 'aisle', 'H45', 'H13', 'aisle', 'H48', 'empty'],
                              ['H04', 'H57', 'aisle', 'H31', 'H06', 'aisle', 'H15', 'aisle', 'H26', 'H59', 'aisle', 'H55', 'H60', 'aisle', 'H39', 'H17'],
                              ['H03', 'H47', 'aisle', 'H28', 'H53', 'aisle', 'H52', 'aisle', 'H40', 'H27', 'aisle', 'H32', 'H08', 'aisle', 'H10', 'H44'],
                              ['empty', 'empty', 'H18', 'H30', 'aisle', 'aisle', 'H25', 'aisle', 'H11', 'H54', 'aisle', 'aisle', 'H43', 'H09', 'H07', 'empty']
                            ]

const CaucusTracker = ({candidates}) => {
  return (
    <div className='caucus-tracker'>
      <div className='caucus-house-2025'>
        {HOUSE_SEATING_CHART.map(row => {
          return (
            <div className='row'>
              {
                row.map(space => {
                  if (space === 'empty') return <div className='empty'></div>
                  if (space === 'aisle') return <div className='aisle'></div>
                  return(
                    <div className='seat' style={{backgroundColor: '#666'}}>{space}</div>
                  )
                })
              }
            </div>
          )

        })}
      </div>
    </div>
  )
}

export default CaucusTracker