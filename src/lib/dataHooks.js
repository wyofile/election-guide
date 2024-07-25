import useSWRImmutable from 'swr/immutable'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const API_BASE_PATH = 'https://wyofile.com/wp-json/wp/v2'
const EXCLUDED_CATEGORY_IDS = [9251]
const AFTER_DATE = '2023-01-01T00:00:00Z'
const REQUEST_FIELDS = ['id', 'date', 'link', 'title']

export const useStories = (tagId, count) => {
  const key = `${API_BASE_PATH}/posts?tags=${tagId}&per_page=${count}&categories_exclude=${EXCLUDED_CATEGORY_IDS}&after=${AFTER_DATE}&_fields=${REQUEST_FIELDS}`

  const {data: stories, isLoading, error} = useSWRImmutable(key, fetcher)

  return {
    stories,
    isLoading,
    error
  }
}