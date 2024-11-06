import { timeFormat } from 'd3-time-format'
import { format } from 'd3-format'
import { useRouter } from 'next/router'

export const formatDate = timeFormat('%b %-d, %Y - %I:%M %p')
export const numberFormat = format(',.0f')
export const percentFormat = format('.1%')

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
    return `WY House District ${parseInt(district.substring(1))}`
  } else if (district[0] === 'S') {
    return `WY Senate District ${parseInt(district.substring(1))}`
  }
}

export const getPortraitPath = (hasPhoto, party, slug) => {
  if (hasPhoto) {
    return usePath(`/portraits-t/${slug}.png`)
  } else {
    return usePath('/portraits-t/non-participant.png')
  }
}