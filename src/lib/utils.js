import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

export const urlize = str => str.toLowerCase().replaceAll(/\s/g, '-')

export const formatDate = timeFormat('%b %-d, %Y')
export const formatTimeLong = timeFormat('%-I:%M %p %b %-d, %Y')


export const pluralize = (text, value) => value === 1 ? text : `${text}s`

export const getDistrictNumber = (key) => {
    return +key.replace('-', '').replace('SD', '').replace('HD', '')
}

export const dollarFormatResponsive = num => {
    if (Math.abs(num) < 1000) return format('$,.0f')(num)
    if (Math.abs(num) >= 1000 && (Math.abs(num) < 10_000)) return format('$,.1s')(num)
    if (Math.abs(num) >= 10_000 && (Math.abs(num) < 100_000)) return format('$,.2s')(num)
    if (Math.abs(num) >= 100_000 && (Math.abs(num) < 1_000_000)) return format('$,.3s')(num)
    if (Math.abs(num) >= 1_000_000 && (Math.abs(num) < 10_000_000)) return format('$,.2s')(num)
    if (Math.abs(num) >= 10_000_000 && (Math.abs(num) < 100_000_000)) return format('$,.3s')(num)
    else return 'ERR'
}

export const formatRace = district => {
    if (district === 'us-sen') {
        return "U.S. Senate"
    } else if (district === 'us-house') {
        return "U.S. House of Representatives"
    } else if (district[0] === 'H') {
        return `WY State House District ${parseInt(district.substring(1))}`
    } else if (district[0] === 'S') {
        return `WY State Senate District ${parseInt(district.substring(1))}`
    }
}

export const getPortraitPath = (basePath, hasPhoto, party, slug) => {
    if (hasPhoto) {
        return `${basePath}/portraits/${slug}.png`
      } else if (party === 'REP') {
        return `${basePath}/portraits/non-participantrepublican.png`
      } else if (party === 'DEM') {
        return `${basePath}/portraits/non-participantdemocratic.png`
      } else {
        return `${basePath}/portraits/non-participant.png`
      }
}