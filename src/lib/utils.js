import { timeFormat } from 'd3-time-format'
import { useRouter } from 'next/router'

export const formatDate = timeFormat('%b %-d, %Y')

export const pluralize = (text, value) => value === 1 ? text : `${text}s`

export const usePath = (path) => {
  return `${useRouter().basePath}${path}`
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

export const getPortraitPath = (hasPhoto, party, slug) => {
  if (hasPhoto) {
    return usePath(`/portraits/${slug}.png`)
  } else if (party === 'REP') {
    return usePath('/portraits/non-participantrepublican.png')
  } else if (party === 'DEM') {
    return usePath('/portraits/non-participantdemocratic.png')
  } else {
    return usePath('/portraits/non-participant.png')
  }
}