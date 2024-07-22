import { useEffect, useState } from 'react'

const API_PATH = 'https://wyofile.com/wp-json/wp/v2'

// export const useTagCount = (slug) => {
//   const path = `${API_PATH}/tags?slug=${slug}&_fields[]=id&_fields[]=count`
//   const { data, error, isLoading } = useSwr(path, fetcher)

//   return {
//     count: data[0].count,
//     isLoading,
//     isError: error
//   }
// }

// export const useStoriesWithSlug = (count, slug) => {
//   const tagPath = `${AtPI_PATH}/tags?slug=${slug}&_fields[]=id&_fields[]=count`
//   const { data: tags, error: tagsError } = useSwr(slug ? tagPath : null, fetcher)

//   const { data: stories, error: storiesError } = useSwr(tags[0] ? `${API_PATH}/posts?tag=${tags[0].id}&per_page=${count}&_fields[]=id&_fields[]=date&_fields[]=link&_fields[]=title`: null, fetcher)
//   console.log(stories)

//   return {
//     stories,
//     error: tagsError || storiesError,
//     isLoading: !storiesError && !stories
//   }
// }

export const useStoriesWithSlug = (count, slug) => {
  const [stories, setStories] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_PATH}/tags?slug=${slug}&_fields[]=id&_fields[]=count`)
      .then(tagRes => tagRes.json())
      .then(tags => {
        if (tags.length > 0) {
          fetch(`${API_PATH}/posts?tags=${tags[0].id}&per_page=${count}&_fields[]=id&_fields[]=date&_fields[]=link&_fields[]=title`)
          .then(storiesRes => storiesRes.json())
          .then(stories => {
            setStories(stories)
            setLoading(false)
          })
          .catch(storiesError => {
            setError(storiesError);
            setLoading(false);
          });
        } else {
          setStories([])
          setLoading(false)
        }
      })
      .catch(tagError => {
        setError(tagError);
        setLoading(false);
      });
  }, [slug]);

  return {
    stories,
    loading,
    error
  }
}
