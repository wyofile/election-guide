import useSWRImmutable from 'swr/immutable'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const API_PATH = 'https://wyofile.com/wp-json/wp/v2'
const OPINION_CATEGORY_ID = 9251
const JAN_01_2023 = '2023-01-01T00:00:00Z'

export const useStories = (tagId, count) => {
  const fieldsString = ['id', 'date', 'link', 'title'].join(',')

  const key = `${API_PATH}/posts?tags=${tagId}&per_page=${count}&categories_exclude=${OPINION_CATEGORY_ID}&after=${JAN_01_2023}&_fields=${fieldsString}`

  const {data: stories, isLoading, error} = useSWRImmutable(key, fetcher)

  return {
    stories,
    isLoading,
    error
  }
}